import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/let';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';
import { MixinChainable } from '../custom-rx/chainable.mixin';
import {isMatch as originalIsMatch, curryRight} from 'lodash';

// todo: use lodash/fp once typings for this are available
// (follow: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/7896)
const isMatch = curryRight(originalIsMatch);

interface AsyncResult<K, V> {
    result: Promise<V>,
    attributes: K;
}

const promiseResults = [{
    result: Promise.resolve(),
    attrs: {
        isBlocking: false,
        subsystem: 'security',
        type: 'LoadRoles'
    }
}, {
    result: Observable.of(undefined),
    attrs: {
        isBlocking: false,
        subsystem: 'security',
        type: 'SetCurrentUser'
    }
}];

const result$ = Observable.from(promiseResults)
    .filter(x => x.attrs.isBlocking)
    .mergeMap(x => Observable.of(x.result).mapTo(x));



class AsyncListEventsObservable<K, V> extends MixinChainable<AsyncResult<K, V>>(Observable) {
    filterByAttributes(predicate: (attrs: K) => boolean) {
        return this.chain(me => me.filter(x => predicate(x.attributes)));
    }
    where(requiredAttrs: K) {
        return this.filterByAttributes(isMatch(requiredAttrs))
    }
}


function fromAsynResults<T, R>(results: AsyncResult<T, R>[]): AsyncListEventsObservable<T, R> {
    return new AsyncListEventsObservable(subscriber => {
        return Observable.from(results).subscribe(subscriber);
    });
}







/*

class AsyncListEventsObservable<T, R> extends Observable<AsyncResult<T, R>> {

}

class AsyncListEventsSubject<T, R> extends AsyncListEventsObservable<T, R> {
    constructor(list: AsyncResult<T, R>[]) {
        super(); // todo
    }
}

function create<T, R = void>(list: AsyncResult<T, R>[]) {
    return new AsyncListEventsSubject(list);
}
*/
