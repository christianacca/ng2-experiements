import { Component, OnInit, Input, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, DoCheck } from '@angular/core';
import { Model, ModelClass } from './model';
import { NgForm } from '@angular/forms';
import { KeyValueDifferSubject, ChangeCollection } from './key-value-differ-observable';
import './key-value-differ-operator';
import { Observable } from 'rxjs/Observable';
import { AutoUnsubscribe } from '../../../core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/reduce';

@Component({
  selector: 'app-key-value-differ-form',
  templateUrl: './key-value-differ-form.component.html',
  styles: []
})
@AutoUnsubscribe
export class KeyValueDifferFormComponent implements DoCheck, OnInit {
  @Input() model: Model;
  modelDiffs: KeyValueDifferSubject<Model>;
  logs$: Observable<string[]>;
  addCount$: Observable<number>;
  changeCount$: Observable<number>;
  removeCount$: Observable<number>;
  subscriptions = new Subscription();
  constructor(private differs: KeyValueDiffers) { }

  ngOnInit() {
    this.modelDiffs = Observable.diff(this.model, this.differs);

    // we need to `publishReplay` to avoid the async pipe in our template
    // missing the first set of changes

    const birthdaysOnly = (changes: KeyValueChanges<keyof Model, any>) => {
      return Observable.ofChanges<Model>(changes)
        .includes(r => r.key === 'age')
        .mapToRecordsOf('change')
        .filter(r => r.key === 'age');
    }

    const logs$ = this.modelDiffs
      .switchMap(changes =>
        birthdaysOnly(changes)
          .map(r => [`Happy ${r.currentValue}`])
          .merge([this.toLogEntries(changes)])
          .reduce((prev, current) => current.concat(prev))
      )
      .publishReplay(1);
    this.subscriptions.add(logs$.connect());
    this.logs$ = logs$;

    this.addCount$ = this.countOf$('add');
    this.removeCount$ = this.countOf$('remove');
    this.changeCount$ = this.countOf$('change');

  }

  private countOf$(collection: ChangeCollection): Observable<number> {
    const o = this.modelDiffs
      .mapToArrayOf(collection)
      .scan((sum, records) => sum + records.length, 0)
      .publishReplay(1)
    this.subscriptions.add(o.connect());
    return o;
  }



  ngDoCheck(): void {
    this.modelDiffs.detectChanges();
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
