import { Type, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// export interface LifecycleEvents {
//     ngOnChanges$: Observable<SimpleChanges>;
//     ngOnDestroy$: Observable<void>;
// }

export interface OnChanges$ extends OnChanges {
    ngOnChanges$: Observable<SimpleChanges>;
}

export interface OnDestroy$ extends OnDestroy {
    ngOnDestroy$: Observable<void>;
}

export function mixinOnChanges$<T extends Type<{}>>(Base: T): Type<OnChanges>& T {
    return class extends Base {
        private _ngOnChangesSubject = new Subject<SimpleChanges>();
        get ngOnChanges$() {
            return this._ngOnChangesSubject.asObservable();
        }
        ngOnChanges(changes: SimpleChanges) {
            this._ngOnChangesSubject.next(changes);
            if (super['ngOnChanges']) {
                super['ngOnChanges'](changes);
            }
        }
    }
}

export function mixinOnDestroy$<T extends Type<{}>>(Base: T): Type<OnDestroy> & T {
    return class extends Base {
        private _ngOnDestroySubject = new Subject<void>();
        get ngOnDestroy$() {
            return this._ngOnDestroySubject.asObservable();
        }
        ngOnDestroy() {
            this._ngOnDestroySubject.next(null);
            if (super['ngOnDestroy']) {
                super['ngOnDestroy']();
            }
        }
    }
}

// export function mixinLifecycleEvents<T extends Type<{}>>(base: T): Type<LifecycleEvents> {
//     return class extends base {
//         private _ngOnChangesSubject = new Subject<SimpleChanges>();
//         private _ngOnDestroySubject = new Subject<void>();
//         get ngOnChanges$() {
//             return this._ngOnChangesSubject.asObservable();
//         }
//         get ngOnDestroy$() {
//             return this._ngOnDestroySubject.asObservable();
//         }
//     }
// }
