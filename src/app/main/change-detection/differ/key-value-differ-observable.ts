import { KeyValueDiffer, KeyValueChangeRecord } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';


class KeyValueDifferObservable<T> extends Observable<KeyValueChangeRecord<string, T>> {
  private subject = new Subject<KeyValueChangeRecord<string, T>>();

  static create<T>(differ: KeyValueDiffer<string, T>) {
    return new KeyValueDifferObservable<T>(differ);
  }

  diff(obj: { [key: string]: T }) {
    const changes = this.differ.diff(obj);
    if (changes) {
      changes.forEachChangedItem(r => {
        this.subject.next(r);
      });
      changes.forEachAddedItem(r => {
        this.subject.next(r);
      });
      changes.forEachRemovedItem(r => {
        this.subject.next(r);
      });
    }
  }

  private constructor(
    private differ: KeyValueDiffer<string, T>) {
    super((subscriber: Subscriber<KeyValueChangeRecord<string, T>>) => {
      return this.subject.subscribe(subscriber);
    });
  }
}
