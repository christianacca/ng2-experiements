import { KeyValueChangeRecord, KeyValueChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { MixinChainable } from '../chainable-mixin';

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

export class KeyValueDiffObservable<T extends object, K extends keyof T = keyof T>
    extends MixinChainable<KeyValueChanges<K, any>>(Observable) {
    mapToArrayOf(...collections: ChangeCollection[]) {
        return this.map(changes => toArray(changes, collections));
    }
    includes2(predicate: (record: KeyValueChangeRecord<K, any>) => boolean) {
        return new KeyValueDiffObservable<T, K>(subscriber => {
            return this.filter(changes => hasRecord(changes, predicate)).subscribe(subscriber);
        })
    }
    includes(predicate: (record: KeyValueChangeRecord<K, any>) => boolean) {
        return this.chain(me => me.filter(changes => hasRecord(changes, predicate)))
    }
    // includes(predicate: (record: KeyValueChangeRecord<K, any>) => boolean) {
    //     return new KeyValueDiffObservable<T, K>(subscriber => {
    //         return this.subscribe({
    //             next: (changes) => {
    //                 if (hasRecord(changes, predicate)) {
    //                     subscriber.next(changes);
    //                 }
    //             },
    //             error: (err) => { subscriber.error(err); },
    //             complete: () => { subscriber.complete(); }
    //         })
    //     })
    // }
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
