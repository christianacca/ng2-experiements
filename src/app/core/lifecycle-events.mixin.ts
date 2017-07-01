import { Type, DoCheck } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface LifecycleEvents {
    ngDoCheck$: Observable<void>;
}

export function mixinLifecycleEvents<T extends Type<any>>(Base: T)
    : Type<DoCheck & LifecycleEvents> & T {
    return class extends Base implements LifecycleEvents {
        private ngDoCheckSubject = new Subject<void>();
        ngDoCheck$ = this.ngDoCheckSubject.asObservable();
        ngDoCheck() {
            const originalFn: Function = super['originalNgDoCheck'];
            if (originalFn) {
                originalFn();
            }
            this.ngDoCheckSubject.next();
        }
    };
}
