import { Observable } from 'rxjs/Observable';
import { KeyValueDiffObservable } from '../../diff/key-value-diff.observable';
import { KeyValueChanges } from '@angular/core';
import 'rxjs/add/observable/of';

export function staticOfDiff<T extends object, K extends keyof T = keyof T>(changes: KeyValueChanges<K, any>) {
    return new KeyValueDiffObservable<T, K>(function(subscriber) {
        return Observable.of(changes).subscribe(subscriber);
    })
}

declare module 'rxjs/Observable' {
    namespace Observable {
        let ofChanges: typeof staticOfDiff;
    }
}

Observable.ofChanges = staticOfDiff;
