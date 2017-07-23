import { Type } from '@angular/core';
import { isPromiseLike } from './is-promise-like';
import { Deferred } from './deferred';

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


const deferKey = Symbol('defer');

function wrapResolve(originalResolve: () => void | Promise<void>, deferredField: string) {
    return async function (this: object) {
        const defer = this[deferKey] as Deferred<void>;

        if (defer.isDone) {
            return defer.promise;
        }

        try {
            await originalResolve.call(this);
            defer.resolve();
        } catch (error) {
            defer.reject(error);
        }
        return defer.promise;
    }
}

function addDeferrableBackingFields(proto: object, deferredField: string) {

    Object.defineProperty(proto, deferredField, {
        get: function (this: object) {
            const defer = this[deferKey] = (this[deferKey] as Deferred<void> || Deferred.defer<void>());
            return defer.promise;
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
