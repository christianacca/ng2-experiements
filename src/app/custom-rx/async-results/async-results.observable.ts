import { Observable, SubscribableOrPromise } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';
import { MixinChainable } from '../chainable.mixin';
import { isMatch as originalIsMatch, isObject as _isObject, curryRight } from 'lodash-es';
import { AsyncResult } from './async-result';
import { negate } from 'lodash-es';

// todo: use lodash/fp once typings for this are available
// (follow: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/7896)
const isMatch = curryRight(originalIsMatch);


function isObject(value: any): value is Object {
    return _isObject(value);
}

type Predicate<T> = (value: T) => boolean;

export class AsyncResultsObservable<K, V> extends MixinChainable<AsyncResult<K, V>>(Observable) {
    filterByKey(predicate: (key: K) => boolean) {
        return this.chain(me => me.filter(x => predicate(x.key)));
    }
    partition(key: K | Partial<K> | Predicate<K>) {
        const predicate = this.getPredicate(key);
        return new Observable<AsyncResultsObservable<K, V>>(subscriber => {
            const partition$ = Observable.from([
                this.filterByKey(predicate), this.filterByKey(negate(predicate))
            ]);
            return partition$.subscribe(subscriber);
        })
    }
    private getPredicate(key: K | Partial<K> | Predicate<K>) {
        if (typeof key === 'function') {
            return key;
        } else if (isObject(key)) {
            return isMatch(key)
        } else {
            return key2 => key2 === key;
        }
    }
    where(key: K | Partial<K>) {
        const predicate = this.getPredicate(key);
        return this.filterByKey(predicate);
    }
    results() {
        return this.mergeMap(x => x.result);
    }
}
