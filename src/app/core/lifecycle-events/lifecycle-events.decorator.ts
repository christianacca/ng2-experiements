import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Type } from '@angular/core';
import { LifecycleEvents } from './lifecycle-events';
import { LifecycleEventsObservable } from './lifecycle-events.observable';


interface LifecycleEventsMixin extends LifecycleEvents {
  doCheckSubject: Subject<string>
}


export function MixinLifecycleEvents(Base: Type<LifecycleEvents>) {
  const originalDoCheck = Base.prototype.ngDoCheck;
  const originalOnInit = Base.prototype.ngOnInit;

  Base.prototype.ngOnInit = function ngOnInit(this: LifecycleEventsMixin, ...args: any[]) {
    this.doCheckSubject = new Subject<string>();
    this.lifecycleEvent$ = LifecycleEventsObservable.fromSubject(this.doCheckSubject);
    if (originalOnInit) {
      originalOnInit.apply(this, args);
    }
    this.doCheckSubject.next('OnInit');
  };

  Base.prototype.ngDoCheck = function ngDoCheck(this: LifecycleEventsMixin, ...args: any[]) {
    if (originalDoCheck) {
      originalDoCheck.apply(this, args);
    }
    this.doCheckSubject.next('DoCheck');
  };
}


