import { Component, OnInit, KeyValueDiffers, KeyValueDiffer, DoCheck, KeyValueChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Model, ModelClass } from './model';

@Component({
  selector: 'app-key-value-differ',
  templateUrl: './key-value-differ.component.html',
  styles: []
})
export class KeyValueDifferComponent implements OnInit, DoCheck {
  private instanceDiffer: KeyValueDiffer<string, any>;
  private literalDiffer: KeyValueDiffer<string, any>;
  private counter = 0;
  logs: string[] = [];
  instanceLogs: string[] = [];
  literal: Model;
  instance: Model;
  constructor(differs: KeyValueDiffers) {
    this.literal = {
      age: 25,
      child: {},
      firstName: 'c',
      lastName: 'crow',
      get name(this: Model) {
        return `${this.firstName} ${this.lastName}`;
      }
    };
    this.instance = new ModelClass();
    this.literalDiffer = differs.find(this.literal).create();
    this.instanceDiffer = differs.find(this.instance).create();
    const literalDiffer = differs.find(this.literal).create();
  }

  ngOnInit() {
  }

  ngDoCheck(): void {
    const literalObjChanges = this.literalDiffer.diff(this.literal);
    const instanceChanges = this.instanceDiffer.diff(this.instance);
    this.logChanges(literalObjChanges, 'literal', this.logs);
    this.logChanges(instanceChanges, 'instance', this.instanceLogs);

  }

  apply(form: NgForm, target: object) {
    Object.assign(target, form.value);
  }

  replaceChild() {
    this.literal.child = { name: Math.ceil(Math.random() * 10).toString() }
  }

  removeChild() {
    delete this.literal.child;
  }

  replaceChildInstance() {
    this.instance.child = { name: Math.ceil(Math.random() * 10).toString() }
  }

  removeChildInstance() {
    delete this.instance.child;
  }

  logChanges(changes: KeyValueChanges<string, any>, prefix: string, logs: string[]) {
    if (changes == null) {
      const msg = `${prefix} - no change`;
      if (logs.length && logs[0].startsWith(msg)) {
        logs[0] = `${prefix} - no change (${this.counter++})`;
      } else {
        this.counter = 0;
        logs.unshift(`${prefix} - no change`);
      }
      return;
    }
    changes.forEachChangedItem(r => {
      logs.unshift(`${prefix}.${r.key} - change: ${JSON.stringify(r.currentValue)} (prev: ${JSON.stringify(r.previousValue)})`)
    });
    changes.forEachAddedItem(r => {
      logs.unshift(`${prefix}.${r.key} - add: ${JSON.stringify(r.currentValue)} (prev: ${JSON.stringify(r.previousValue)})`)
    });
    changes.forEachRemovedItem(r => {
      logs.unshift(`${prefix}.${r.key} - removed: ${JSON.stringify(r.currentValue)} (prev: ${JSON.stringify(r.previousValue)})`)
    });
    // `forEachItem`, `forEachPreviousItem` don't seem useful...
    // changes.forEachItem(r => {
    //   logs.unshift(`${prefix}.${r.key}: ${JSON.stringify(r.currentValue)} (prev: ${JSON.stringify(r.previousValue)})`)
    // });
    // changes.forEachPreviousItem(r => {
    //   logs.unshift(`${prefix}.${r.key}: ${JSON.stringify(r.currentValue)} (prev: ${JSON.stringify(r.previousValue)})`)
    // });
  }

}
