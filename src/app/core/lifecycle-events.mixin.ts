import { Type, DoCheck, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface LifecycleEvents2 extends AfterViewInit, DoCheck {
    doCheck$: Observable<void>;
    afterViewInit$: Observable<void>;
}

export function mixinLifecycleEvents<T extends Type<any>>(Base: T)
    : Type<LifecycleEvents2> & T {
    return class extends Base implements LifecycleEvents2 {
        private doCheckSubject = new Subject<void>();
        private afterViewInitSubject = new Subject<void>();
        doCheck$ = this.doCheckSubject.asObservable();
        afterViewInit$ = this.afterViewInitSubject.asObservable();
        ngDoCheck() {
            const originalFn: Function = super['ngDoCheck'];
            if (originalFn) {
                originalFn();
            }
            this.doCheckSubject.next();
        }
        ngAfterViewInit() {
            const originalFn: Function = super['ngAfterViewInit'];
            if (originalFn) {
                originalFn();
            }
            this.afterViewInitSubject.next();
        }
    };
}
