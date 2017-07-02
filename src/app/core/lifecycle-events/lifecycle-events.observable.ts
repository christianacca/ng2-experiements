import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';

export type EventName = 'DoCheck' | 'OnInit';

function onOne(eventName: EventName) {
    return function(this: LifecycleEventsObservable) {
        const self = this;
        return new LifecycleEventsObservable(subscriber => {
            return self.filter(name => name === 'DoCheck').subscribe(subscriber);
        });
    }
}

export interface LifecycleEventsObservable {
    doCheck(): LifecycleEventsObservable;
    onInit(): LifecycleEventsObservable;
}

export class LifecycleEventsObservable<T = EventName> extends Observable<EventName> {

    static fromSubject(subject: Subject<EventName>) {
        const obs = new LifecycleEventsObservable();
        (obs as any).source = subject;
        return obs;
    }

    filterOn(...eventNames: EventName[]) {
        return new LifecycleEventsObservable(subscriber => {
            return this.filter(name => eventNames.includes(name)).subscribe(subscriber);
        });
    }
}

LifecycleEventsObservable.prototype.doCheck = onOne('DoCheck');
LifecycleEventsObservable.prototype.onInit = onOne('OnInit');
