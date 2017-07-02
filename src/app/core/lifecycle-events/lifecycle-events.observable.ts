import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { EventName, LifeCycleEvent, OnChangesLifeCycleEvent } from './lifecycle-events';
import { SimpleChanges } from '@angular/core';

function onOne(eventName: EventName) {
    return function(this: LifecycleEventsObservable) {
        const self = this;
        return new LifecycleEventsObservable(subscriber => {
            return self.filter(evt => evt.name === eventName).subscribe(subscriber);
        });
    }
}

export interface LifecycleEventsObservable {
    afterContentChecked(): LifecycleEventsObservable<LifeCycleEvent>;
    afterContentInit(): LifecycleEventsObservable<LifeCycleEvent>;
    afterViewChecked(): LifecycleEventsObservable<LifeCycleEvent>;
    afterViewInit(): LifecycleEventsObservable<LifeCycleEvent>;
    doCheck(): LifecycleEventsObservable<LifeCycleEvent>;
    onChanges(): LifecycleEventsObservable<LifeCycleEvent>;
    onDestroy(): LifecycleEventsObservable<LifeCycleEvent>;
    onInit(): LifecycleEventsObservable<LifeCycleEvent>;
}

export class LifecycleEventsObservable<T extends LifeCycleEvent = LifeCycleEvent> extends Observable<T> {

    static fromSubject(subject: Subject<LifeCycleEvent>) {
        const obs = new LifecycleEventsObservable();
        (obs as any).source = subject;
        return obs;
    }

    on(...eventNames: EventName[]) {
        return new LifecycleEventsObservable(subscriber => {
            return this.filter(evt => eventNames.includes(evt.name)).subscribe(subscriber);
        });
    }
}

LifecycleEventsObservable.prototype.afterContentChecked = onOne('AfterContentChecked');
LifecycleEventsObservable.prototype.afterContentInit = onOne('AfterContentInit');
LifecycleEventsObservable.prototype.afterViewChecked = onOne('AfterViewChecked');
LifecycleEventsObservable.prototype.afterViewInit = onOne('AfterViewInit');
LifecycleEventsObservable.prototype.doCheck = onOne('DoCheck');
LifecycleEventsObservable.prototype.onChanges = onOne('OnChanges');
LifecycleEventsObservable.prototype.onDestroy = onOne('OnDestroy');
LifecycleEventsObservable.prototype.onInit = onOne('OnInit');
