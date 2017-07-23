import { Type } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { isPromiseLike } from '../core';

const resolveDeferredMetadataKey = Symbol('resolveDeferred');

function ResolveDeferred() {
    return Reflect.metadata(resolveDeferredMetadataKey, true);
}

function getPropertyNameByMetadataKey(target: any, symbol: Symbol) {
    for (const name in target) {
        if (Reflect.hasOwnMetadata(symbol, target, name)) {
            return name;
        }
    }
    return undefined;
}

interface Deferrable {
    done: Promise<void>;
}


const deferSubjectKey = Symbol('deferSubject');
const deferredKey = Symbol('deferredSubject');

function wrapResolve(originalResolve: () => void | Promise<void>, deferredField: string) {
    return function (this: object) {
        // important: order of next two lines critial
        const deferred = this[deferredField];
        const deferSubject = this[deferSubjectKey] as Subject<void>;

        if (deferSubject.closed) {
            return deferred;
        }

        let result = originalResolve.call(this) as Promise<void>;
        if (!isPromiseLike(result)) {
            result = Promise.resolve();
        }
        result.then(() => {
            deferSubject.next();
            deferSubject.complete();
        })
        return deferred;
    }
}

function addDeferrableBackingFields(proto: object, deferredField: string) {

    Object.defineProperty(proto, deferredField, {
        get: function (this: object) {
            if (!this[deferSubjectKey]) {
                this[deferSubjectKey] = new Subject<void>();
            }
            if (!this[deferredKey]) {
                this[deferredKey] = this[deferSubjectKey].toPromise();
            }
            return this[deferredKey];
        }
    })
}

function Deferrable<T = Deferrable>(deferredField?: keyof T) {
    return (Ctor: Type<T>) => {

        const proto = Ctor.prototype;
        addDeferrableBackingFields(proto, deferredField);

        const resolveFnName = getPropertyNameByMetadataKey(proto, resolveDeferredMetadataKey);
        const originalResolve = proto[resolveFnName] as () => void | Promise<void>;
        proto[resolveFnName] = wrapResolve(originalResolve, deferredField);
    };
}

export { Deferrable, ResolveDeferred };
