import { Observable } from 'rxjs/Observable';
import { KeyValueDiffSubject } from '../../diff/key-value-diff.subject';
import { KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import 'rxjs/add/observable/never';

function isDiffersCollection<T extends object>(value: KeyValueDiffer<string, any> | KeyValueDiffers): value is KeyValueDiffers {
    return ('find' in value) && ('factories' in value);
}

export function staticDiff<T extends object>(
    source: T,
    differ: KeyValueDiffer<keyof T, any> | KeyValueDiffers,
    trigger$: Observable<any> = Observable.never()): KeyValueDiffSubject<T> {
    if (isDiffersCollection(differ)) {
        return KeyValueDiffSubject.create(source, differ.find(source).create(), trigger$);
    } else {
        return KeyValueDiffSubject.create(source, differ, trigger$);
    }
}


declare module 'rxjs/Observable' {
    // tslint:disable-next-line:no-shadowed-variable
    namespace Observable {
        let diff: typeof staticDiff;
    }
}

Observable.diff = staticDiff;
