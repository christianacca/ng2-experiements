import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';
import { MixinChainable } from '../chainable.mixin';
import { isMatch as originalIsMatch, isObject as _isObject, curryRight } from 'lodash-es';
import { AsyncResult } from './async-result';

// todo: use lodash/fp once typings for this are available
// (follow: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/7896)
const isMatch = curryRight(originalIsMatch);


function isObject(value: any): value is Object {
    return _isObject(value);
}

export class AsyncResultsObservable<K, V> extends MixinChainable<AsyncResult<K, V>>(Observable) {
    filterByKey(predicate: (key: K) => boolean) {
        return this.chain(me => me.filter(x => predicate(x.key)));
    }
    where(key: K | Partial<K>) {
        if (isObject(key)) {
            return this.filterByKey(isMatch(key));
        } else {
            return this.filterByKey(key2 => key2 === key)
        }
    }
    results() {
        return this.mergeMap(x => x.result);
    }
}

function fromAsynResults<K, R>(results: AsyncResult<K, R>[]): AsyncResultsObservable<K, R> {
    return new AsyncResultsObservable(subscriber => {
        return Observable.from(results).subscribe(subscriber);
    });
}
