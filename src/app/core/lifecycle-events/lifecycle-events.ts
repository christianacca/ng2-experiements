import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { LifecycleEventsObservable } from './lifecycle-events.observable';

export interface LifecycleEvents {
    lifecycleEvent$: LifecycleEventsObservable;
}

/**
 * Convenience base class that implements the interface required by
 * @link{ MixinLifecycleEvents } decorator
 */
export class LifecycleEventsBase implements LifecycleEvents {
    lifecycleEvent$: LifecycleEventsObservable;

    // These stub methods of angular lifecycle hooks should NOT
    // be necessary.
    // However, there is a current bug that result in *inherited* lifecycle
    // methods not being called when AOT compiling
    // (see/follow: https://github.com/angular/angular/issues/11606#issuecomment-291397458)

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() { }
    // tslint:disable-next-line:use-life-cycle-interface
    ngDoCheck() { }
}
