import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { LifecycleEventsObservable } from './lifecycle-events.observable';
import { SimpleChanges } from '@angular/core';

export type EventName =
    'OnChanges' | 'OnInit' | 'DoCheck' | 'AfterContentInit' | 'AfterContentChecked' | 'AfterViewInit' | 'AfterViewChecked' | 'OnDestroy';

export interface LifecycleEvents {
    lifecycle$: LifecycleEventsObservable;
}

export interface LifeCycleEvent {
    readonly name: EventName
    [key: string]: any;
}

export interface OnChangesLifeCycleEvent extends LifeCycleEvent {
    readonly changes: SimpleChanges;
}

/**
 * Convenience base class that implements the interface required by
 * @link{ MixinLifecycleEvents } decorator
 */
export class LifecycleEventsBase implements LifecycleEvents {
    lifecycle$: LifecycleEventsObservable;

    // These stub methods of angular lifecycle hooks should NOT be necessary.
    // There is a current bug that result in *inherited* lifecycle
    // methods not being called when AOT compiling
    // (see/follow: https://github.com/angular/angular/issues/11606#issuecomment-291397458)

    // tslint:disable:use-life-cycle-interface
    ngAfterContentChecked() { }
    ngAfterContentInit() { }
    ngAfterViewChecked() { }
    ngAfterViewInit() { }
    ngDoCheck() { }
    ngOnChanges() { }
    ngOnDestroy() { }
    ngOnInit() { }
}
