import { Type } from '@angular/core';
import { isPromiseLike } from './is-promise-like';
import { Deferred } from './deferred';

interface Deferrable {
    done: Promise<void>;
}
const defaultDeferredFieldName: keyof Deferrable = 'done';

const resolveDeferredMetadataKey = Symbol('resolveDeferred');

function ResolveDeferred() {
    return Reflect.metadata(resolveDeferredMetadataKey, true);
}

function getPropertyNameByMetadataKey<T>(target: any, symbol: Symbol) {
    for (const name in target) {
        if (Reflect.hasOwnMetadata(symbol, target, name)) {
            return name;
        }
    }
    return undefined;
}


function wrapResolve(originalResolve: () => void | Promise<void>, deferredField: string, deferFieldKey: PropertyKey) {
    return async function (this: object) {
        // ciritial: do not change order of next 2 lines
        const deferred = this[deferredField] as Promise<void>
        const defer = this[deferFieldKey] as Deferred<void>;

        if (defer.isDone) {
            return deferred;
        }

        try {
            await originalResolve.call(this);
            defer.resolve();
        } catch (error) {
            defer.reject(error);
        }
        return deferred;
    }
}

function addDeferredProperty(target: object, deferredField: string, deferFieldKey: PropertyKey) {

    Object.defineProperty(target, deferredField, {
        get: function (this: object) {
            const defer = this[deferFieldKey] = (this[deferFieldKey] as Deferred<void> || Deferred.defer<void>());
            return defer.promise;
        }
    });
}

function addResolveBehaviour(target: object, deferredField: string, deferFieldKey: PropertyKey) {
    const resolveFnName = getPropertyNameByMetadataKey(target, resolveDeferredMetadataKey);
    const originalResolve = target[resolveFnName] as () => void | Promise<void>;
    target[resolveFnName] = wrapResolve(originalResolve, deferredField, deferFieldKey);
}

function Deferrable<T = Deferrable>(deferredField?: keyof T) {
    deferredField = deferredField || defaultDeferredFieldName as keyof T;
    const deferredFieldKey = Symbol(deferredField);
    const deferFieldKey = Symbol(deferredField + '_defer');
    return (Ctor: Type<T>) => {

        addDeferredProperty(Ctor.prototype, deferredField, deferFieldKey);
        addResolveBehaviour(Ctor.prototype, deferredField, deferFieldKey);
    };
}

export { Deferrable, ResolveDeferred };
