import { KeyValueDiffer, KeyValueChanges } from '@angular/core';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';

import { KeyValueDiffObservable } from './key-value-diff.observable';

export class KeyValueDiffSubject<T extends {}, K extends keyof T = keyof T> extends KeyValueDiffObservable<T, K> {
    private subject = new Subject<KeyValueChanges<K, any>>();

    static create<T extends object, K extends keyof T>(source: T, differ: KeyValueDiffer<K, any>) {
        return new KeyValueDiffSubject<T, K>(source, differ);
    }

    detectChanges() {
        const changes = this.differ.diff(this.value);
        if (!changes) { return; }

        this.subject.next(changes);
    }

    private constructor(
        public value: T,
        private differ: KeyValueDiffer<K, any>) {
        super((subscriber: Subscriber<KeyValueChanges<K, any>>) => {
            return this.subject.subscribe(subscriber);
        });
    }
}
