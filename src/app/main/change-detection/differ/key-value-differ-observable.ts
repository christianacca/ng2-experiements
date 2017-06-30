import { KeyValueDiffer, KeyValueChangeRecord, KeyValueChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';


function toChangeRecords<K, V>(changes: KeyValueChanges<K, V>) {
    const result: KeyValueChangeRecord<K, V>[] = [];
    changes.forEachChangedItem(r => {
        result.push(r);
    });
    changes.forEachAddedItem(r => {
        result.push(r);
    });
    changes.forEachRemovedItem(r => {
        result.push(r);
    });
    return result;
}

function hasChange<K, V>(changes: KeyValueChanges<K, V>, predicate: (record: KeyValueChangeRecord<K, V>) => boolean) {
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

export class KeyValueDifferObservable extends Observable<KeyValueChanges<string, any>> {
    filterByRecord(predicate: (record: KeyValueChangeRecord<string, any>) => boolean) {
        return new KeyValueDifferObservable(subscriber => {
            return this.filter(changes => hasChange(changes, predicate)).subscribe(subscriber);
        })
    }
    mapToRecords() {
        return this.map(toChangeRecords);
    }
}



export class KeyValueDifferSubject<T extends object> extends KeyValueDifferObservable {
    private subject = new Subject<KeyValueChanges<string, any>>();

    static create<T extends object>(source: T, differ: KeyValueDiffer<string, any>) {
        return new KeyValueDifferSubject<T>(source, differ);
    }

    detectChanges() {
        const changes = this.differ.diff(this.value);
        if (!changes) { return; }

        this.subject.next(changes);
    }

    private constructor(
        public value: T,
        private differ: KeyValueDiffer<string, any>) {
        super((subscriber: Subscriber<KeyValueChanges<string, any>>) => {
            return this.subject.subscribe(subscriber);
        });
    }
}

