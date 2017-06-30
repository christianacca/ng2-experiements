import { Observable } from 'rxjs/Observable';
import { KeyValueDifferSubject } from './key-value-differ-observable';
import { KeyValueDiffer, KeyValueDiffers } from '@angular/core';

function isDiffersCollection(value: KeyValueDiffer<string, any> | KeyValueDiffers): value is KeyValueDiffers {
    return ('find' in value) && ('factories' in value);
}

export function staticDiff<T extends object>(
    source: T,
    differ: KeyValueDiffer<string, any> | KeyValueDiffers): KeyValueDifferSubject<T> {
    if (isDiffersCollection(differ)) {
        return KeyValueDifferSubject.create(source, differ.find(source).create());
    } else {
        return KeyValueDifferSubject.create(source, differ);
    }
}

declare module 'rxjs/Observable' {
    namespace Observable {
        let diff: typeof staticDiff;
    }
}

Observable.diff = staticDiff;
