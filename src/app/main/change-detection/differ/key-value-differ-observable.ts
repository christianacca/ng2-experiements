import { KeyValueDiffer, KeyValueChangeRecord, KeyValueChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

export type ChangeCollection = 'add' | 'remove' | 'change';

function toArray<K, V>(changes: KeyValueChanges<K, V>, collections?: ChangeCollection[]) {
    const result: KeyValueChangeRecord<K, V>[] = [];
    if (collections === undefined || collections.includes('change')) {
        changes.forEachChangedItem(r => {
            result.push(r);
        });
    }
    if (collections === undefined || collections.includes('add')) {
        changes.forEachAddedItem(r => {
            result.push(r);
        });
    }
    if (collections === undefined || collections.includes('remove')) {
        changes.forEachRemovedItem(r => {
            result.push(r);
        });
    }
    return result;
}

function hasRecord<K, V>(changes: KeyValueChanges<K, V>, predicate: (record: KeyValueChangeRecord<K, V>) => boolean) {
    let match = false;
    const shortCiruitingPredicate = (r: KeyValueChangeRecord<K, V>) => {
        return match = match || predicate(r);
    }
    changes.forEachChangedItem(shortCiruitingPredicate);
    if (match) { return true; }
    changes.forEachAddedItem(shortCiruitingPredicate);
    if (match) { return true; }
    changes.forEachRemovedItem(shortCiruitingPredicate);
    if (match) { return true; }
}

export class KeyValueDifferObservable<T extends object, K extends keyof T = keyof T> extends Observable<KeyValueChanges<K, any>> {
    mapToArrayOf(...collections: ChangeCollection[]) {
        return this.map(changes => toArray(changes, collections));
    }
    includes(predicate: (record: KeyValueChangeRecord<K, any>) => boolean) {
        return new KeyValueDifferObservable<T, K>(subscriber => {
            return this.filter(changes => hasRecord(changes, predicate)).subscribe(subscriber);
        })
    }
    mapToArray() {
        return this.map(changes => toArray(changes));
    }
    mapToRecords() {
        return this
            .map(changes => toArray(changes))
            .switchMap(records => Observable.from(records));
    }
    mapToRecordsOf(...collections: ChangeCollection[]) {
        return this
            .map(changes => toArray(changes, collections))
            .switchMap(records => Observable.from(records));
    }
}



export class KeyValueDifferSubject<T extends {}, K extends keyof T = keyof T> extends KeyValueDifferObservable<T, K> {
    private subject = new Subject<KeyValueChanges<K, any>>();

    static create<T extends object, K extends keyof T>(source: T, differ: KeyValueDiffer<K, any>) {
        return new KeyValueDifferSubject<T, K>(source, differ);
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

