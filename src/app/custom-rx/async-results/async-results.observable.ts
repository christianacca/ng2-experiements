import { Observable, Subscribable, SubscribableOrPromise } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/multicast';
import 'rxjs/add/observable/from';
import '../partition.operator';
import { Subscriber } from 'rxjs/Subscriber';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TeardownLogic } from 'rxjs/Subscription';
import { MixinChainable } from '../chainable.mixin';
import { isMatch as originalIsMatch, isObject as _isObject, curryRight, negate } from 'lodash-es';
import { AsyncResult } from './async-result';

// todo: use lodash/fp once typings for this are available
// (follow: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/7896)
const isMatch = curryRight(originalIsMatch);


function isObject(value: any): value is Object {
    return _isObject(value);
}

type Predicate<T> = (value: T) => boolean;

export class AsyncResultsObservable<K, V> extends MixinChainable<AsyncResult<K, V>>(Observable) {
    filterByKey(predicate: Predicate<K>) {
        const keyPredicate = this.toKeyPredicate(predicate);
        return this.chain(me => me.filter(keyPredicate));
    }
    partitionByKey(key: K | Partial<K> | Predicate<K>) {
        const predicate = this.toKeyPredicate(this.getPredicate(key));
        return this.partition(predicate).map(toAsyncResultsStatic);
    }
    results() {
        return this.mergeMap(x => x.result);
    }
    whereKey(key: K | Partial<K>) {
        const predicate = this.getPredicate(key);
        return this.filterByKey(predicate);
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
    private toKeyPredicate(predicate: Predicate<K>): Predicate<AsyncResult<K, V>> {
        return (item: AsyncResult<K, V>) => predicate(item.key);
    }
}

type ArrayOrObservable<T> = ArrayLike<T> | Subscribable<T>

export function fromAsyncResultsStatic<K, V>(
    results: ArrayOrObservable<AsyncResult<K, V>>): AsyncResultsObservable<K, V> {
    return new AsyncResultsObservable(subscriber => {
        return Observable.from(results).subscribe(subscriber);
    });
}

export function toAsyncResultsStatic<K, V>(results: Observable<AsyncResult<K, V>>) {
    return new AsyncResultsObservable<K, V>(subscriber => {
        return results.subscribe(subscriber);
    });
}
