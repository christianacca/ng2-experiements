import { KeyValueChangeRecord, KeyValueChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

export class KeyValueDiffObservable<T extends object, K extends keyof T = keyof T> extends Observable<KeyValueChanges<K, any>> {
    mapToArrayOf(...collections: ChangeCollection[]) {
        return this.map(changes => toArray(changes, collections));
    }
    includes(predicate: (record: KeyValueChangeRecord<K, any>) => boolean) {
        return new KeyValueDiffObservable<T, K>(subscriber => {
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
