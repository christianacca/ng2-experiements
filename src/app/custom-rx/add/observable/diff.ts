import { Observable } from 'rxjs/Observable';
import { KeyValueDiffSubject } from '../../diff/key-value-diff.subject';
import { KeyValueDiffer, KeyValueDiffers } from '@angular/core';

function isDiffersCollection<T extends object>(value: KeyValueDiffer<keyof T, any> | KeyValueDiffers): value is KeyValueDiffers {
    return ('find' in value) && ('factories' in value);
}

export function staticDiff<T extends object>(
    source: T,
    differ: KeyValueDiffer<keyof T, any> | KeyValueDiffers): KeyValueDiffSubject<T> {
    if (isDiffersCollection(differ)) {
        return KeyValueDiffSubject.create(source, differ.find(source).create());
    } else {
        return KeyValueDiffSubject.create(source, differ);
    }
}


declare module 'rxjs/Observable' {
    namespace Observable {
        let diff: typeof staticDiff;
    }
}

Observable.diff = staticDiff;
