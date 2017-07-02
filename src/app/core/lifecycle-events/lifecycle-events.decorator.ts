import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Type, SimpleChanges } from '@angular/core';
import { LifecycleEvents, EventName, LifeCycleEvent } from './lifecycle-events';
import { LifecycleEventsObservable } from './lifecycle-events.observable';


interface LifecycleEventsMixin extends LifecycleEvents {
    _lifecycleSubject: Subject<LifeCycleEvent>;
    _setupLifecycleFields(): void;
}

const afterContentCheckedEvent: LifeCycleEvent = {
    name: 'AfterContentChecked'
};
const afterContentInitEvent: LifeCycleEvent = {
    name: 'AfterContentInit'
};
const afterViewCheckedEvent: LifeCycleEvent = {
    name: 'AfterViewChecked'
};
const afterViewInitEvent: LifeCycleEvent = {
    name: 'AfterViewInit'
};
const doCheckEvent: LifeCycleEvent = {
    name: 'DoCheck'
};
const onDestroyEvent: LifeCycleEvent = {
    name: 'OnDestroy'
};
const onInitEvent: LifeCycleEvent = {
    name: 'OnInit'
};

export function MixinLifecycleEvents(...events: EventName[]) {
    return (Ctor: Type<LifecycleEvents>) => {
        Ctor.prototype._setupLifecycleFields = _setupLifecycleFields;
        maybeAddNoArgsEvent('AfterContentChecked', afterContentCheckedEvent);
        maybeAddNoArgsEvent('AfterContentInit', afterContentInitEvent);
        maybeAddNoArgsEvent('AfterViewChecked', afterViewCheckedEvent);
        maybeAddNoArgsEvent('AfterViewInit', afterViewInitEvent);
        maybeAddNoArgsEvent('DoCheck', doCheckEvent);
        const addOnInitEvent = events.length === 0 || events.includes('OnInit');
        if (addOnInitEvent) {
            addNoArgsEvent('OnInit', onInitEvent);
        } else {
            addSetupOnly('OnInit');
        }
        maybeAddNoArgsEvent('OnDestroy', onDestroyEvent);
        const originalOnChanges = Ctor.prototype.ngOnChanges;
        if (events.length === 0 || events.includes('OnChanges')) {
            Ctor.prototype.ngOnChanges = ngOnChanges;
        }

        function _setupLifecycleFields(this: LifecycleEventsMixin) {
            if (!this._lifecycleSubject) {
                this._lifecycleSubject = new Subject<LifeCycleEvent>();
                this.lifecycle$ = LifecycleEventsObservable.fromSubject(this._lifecycleSubject);
            }
        }

        function maybeAddNoArgsEvent(eventName: EventName, eventInstance: LifeCycleEvent) {
            const addEvent = events.length === 0 || events.includes(eventName);
            if (!addEvent) {
                return;
            }
            addNoArgsEvent(eventName, eventInstance);
        }

        function addNoArgsEvent(eventName: EventName, eventInstance: LifeCycleEvent) {
            const fnName = 'ng' + eventName;
            const originalFn = Ctor.prototype[fnName];
            Ctor.prototype[fnName] = raiseLifecycleEvent;

            function raiseLifecycleEvent(this: LifecycleEventsMixin) {
                this._setupLifecycleFields();
                if (originalFn) {
                    originalFn.call(this);
                }
                this._lifecycleSubject.next(eventInstance);
            }
        }

        function addSetupOnly(eventName: EventName) {
            const fnName = 'ng' + eventName;
            const originalFn = Ctor.prototype[fnName];
            Ctor.prototype[fnName] = setup;

            function setup(this: LifecycleEventsMixin) {
                this._setupLifecycleFields();
                if (originalFn) {
                    originalFn.call(this);
                }
            }
        }


        function ngOnChanges(this: LifecycleEventsMixin, changes: SimpleChanges) {
            this._setupLifecycleFields();
            if (originalOnChanges) {
                originalOnChanges.call(this, changes);
            }
            this._lifecycleSubject.next({ name: 'OnChanges', changes });
        }
    }
}
