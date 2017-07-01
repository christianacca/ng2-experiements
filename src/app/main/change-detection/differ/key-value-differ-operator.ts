import { Observable } from 'rxjs/Observable';
import { KeyValueDifferSubject, KeyValueDifferObservable } from './key-value-differ-observable';
import { KeyValueDiffer, KeyValueDiffers, KeyValueChanges } from '@angular/core';
import 'rxjs/add/observable/of';

function isDiffersCollection<T extends object>(value: KeyValueDiffer<keyof T, any> | KeyValueDiffers): value is KeyValueDiffers {
    return ('find' in value) && ('factories' in value);
}

export function staticDiff<T extends object>(
    source: T,
    differ: KeyValueDiffer<keyof T, any> | KeyValueDiffers): KeyValueDifferSubject<T> {
    if (isDiffersCollection(differ)) {
        return KeyValueDifferSubject.create(source, differ.find(source).create());
    } else {
        return KeyValueDifferSubject.create(source, differ);
    }
}

export function staticOfDiff<T extends object, K extends keyof T = keyof T>(changes: KeyValueChanges<K, any>) {
    return new KeyValueDifferObservable<T, K>(function(subscriber) {
        return Observable.of(changes).subscribe(subscriber);
    })
}

declare module 'rxjs/Observable' {
    namespace Observable {
        let diff: typeof staticDiff;
        let ofChanges: typeof staticOfDiff;
    }
}

Observable.diff = staticDiff;
Observable.ofChanges = staticOfDiff;
