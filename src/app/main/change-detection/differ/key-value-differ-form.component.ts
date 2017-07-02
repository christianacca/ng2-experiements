import { Component, OnInit, Input, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, DoCheck, Type } from '@angular/core';
import { Model, ModelClass } from './model';
import { NgForm } from '@angular/forms';
import { ChangeCollection, KeyValueDiffSubject } from '../../../custom-rx/diff';
import { Observable } from 'rxjs/Observable';
import { mixinLifecycleEvents } from '../../../core';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/skip';
import '../../../custom-rx/add/observable/diff';
import '../../../custom-rx/add/observable/of-changes';
import { Subject } from 'rxjs/Subject';

export type Constructor<T> = new (...args: any[]) => T;

export function LifecycleEvents<T extends Constructor<{}>>(Base: T) {
  return class Mixin extends Base implements DoCheck {
    private doCheckSubject = new Subject<void>();
    public doCheck$ = this.doCheckSubject.asObservable();
    public ngDoCheck() {
      this.doCheckSubject.next();
    }
  }
}

export class MixinRoot { }


@Component({
  selector: 'app-key-value-differ-form',
  templateUrl: './key-value-differ-form.component.html',
  styles: []
})
export class KeyValueDifferFormComponent extends LifecycleEvents(MixinRoot) implements OnInit {
  @Input() model: Model;
  private modelDiffs: KeyValueDiffSubject<Model>;
  logs$: Observable<string[]>;
  addCount$: Observable<number>;
  changeCount$: Observable<number>;
  removeCount$: Observable<number>;
  constructor(private differs: KeyValueDiffers) {
    super()
  }

  ngOnInit() {
    // wait for async pipe to be initialized before detecting changes on each `DoCheck` s
    const changeDetections$ = this.doCheck$.skip(1);
    this.modelDiffs = Observable.diff(this.model, this.differs, changeDetections$);

    const isKeyValueDifferFormComponent = this instanceof KeyValueDifferFormComponent;

    this.logs$ = this.changeLog$();
    this.addCount$ = this.countOf$('add');
    this.removeCount$ = this.countOf$('remove');
    this.changeCount$ = this.countOf$('change');
  }

  private changeLog$() {
    return this.modelDiffs
      .switchMap(changes =>
        this.birthdaysOnly$(changes)
          .map(r => [`Happy ${r.currentValue}`])
          .merge([this.toLogEntries(changes)])
          .reduce((prev, current) => current.concat(prev))
      )
  }

  private birthdaysOnly$(changes: KeyValueChanges<keyof Model, any>) {
    return Observable.ofChanges<Model>(changes)
      .includes(r => r.key === 'age')
      .mapToRecordsOf('change')
      .filter(r => r.key === 'age');
  }

  private countOf$(collection: ChangeCollection): Observable<number> {
    return this.modelDiffs
      .mapToArrayOf(collection)
      .scan((sum, records) => sum + records.length, 0)
  }

  apply(form: NgForm, target: object) {
    Object.assign(target, form.value);
  }

  replaceChild() {
    this.model.child = { name: Math.ceil(Math.random() * 10).toString() }
  }

  removeChild() {
    delete this.model.child;
  }

  toLogEntries(changes: KeyValueChanges<string, any>) {
    const logs: string[] = [];
    changes.forEachChangedItem(r => {
      logs.unshift(`${r.key} - change: ${JSON.stringify(r.currentValue)} (prev: ${JSON.stringify(r.previousValue)})`)
    });
    changes.forEachAddedItem(r => {
      logs.unshift(`${r.key} - add: ${JSON.stringify(r.currentValue)} (prev: ${JSON.stringify(r.previousValue)})`)
    });
    changes.forEachRemovedItem(r => {
      logs.unshift(`${r.key} - removed: ${JSON.stringify(r.currentValue)} (prev: ${JSON.stringify(r.previousValue)})`)
    });
    // `forEachItem`, `forEachPreviousItem` don't seem useful...
    // changes.forEachItem(r => {
    //   logs.unshift(`${prefix}.${r.key}: ${JSON.stringify(r.currentValue)} (prev: ${JSON.stringify(r.previousValue)})`)
    // });
    // changes.forEachPreviousItem(r => {
    //   logs.unshift(`${prefix}.${r.key}: ${JSON.stringify(r.currentValue)} (prev: ${JSON.stringify(r.previousValue)})`)
    // });

    return logs;
  }

}
