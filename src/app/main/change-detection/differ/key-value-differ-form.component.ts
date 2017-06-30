import { Component, OnInit, Input, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, DoCheck } from '@angular/core';
import { Model, ModelClass } from './model';
import { NgForm } from '@angular/forms';
import { KeyValueDifferSubject } from './key-value-differ-observable';
import './key-value-differ-operator';
import { Observable } from 'rxjs/Observable';
import { AutoUnsubscribe } from '../../../core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-key-value-differ-form',
  templateUrl: './key-value-differ-form.component.html',
  styles: []
})
@AutoUnsubscribe
export class KeyValueDifferFormComponent implements DoCheck, OnInit {
  logsSubscription: Subscription;
  @Input() model: Model;

  modelSubject: KeyValueDifferSubject<any>;
  private counter = 0;
  logs$: Observable<string[]>;
  constructor(private differs: KeyValueDiffers) {}

  ngOnInit() {
    const modelDiffer = this.differs.find(this.model).create();
    this.modelSubject = Observable.diff(this.model, modelDiffer);

    // we need to use a replayable observable to avoid the async pipe in our template missing the first
    // set of changes
    const logs$ = this.modelSubject
      .map(changes => this.formatChanges(changes))
      .scan((acc, current) => current.concat(acc), [])
      .publishReplay(1);
    this.logsSubscription = logs$.connect();
    this.logs$ = logs$;
  }

  ngDoCheck(): void {
    this.modelSubject.detectChanges();
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

  formatChanges(changes: KeyValueChanges<string, any>) {
    const logs: string[] = [];
    if (changes == null) {
      const msg = `no change`;
      if (logs.length && logs[0].startsWith(msg)) {
        logs[0] = `no change (${this.counter++})`;
      } else {
        this.counter = 0;
        logs.unshift(`no change`);
      }
      return;
    }
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
