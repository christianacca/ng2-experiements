import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/let';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';

interface AsyncResult<K, V> {
    result: Promise<V>,
    attrs: K;
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

type ObservableType<T> = new (subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) => Observable<T>;

function MixinChainable<T>(Base: ObservableType<T>) {
    return class Chainable extends Base {
        private Ctor: ObservableType<T>;
        constructor(subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) {
            super(subscribe);
            this.Ctor = new.target;
        }
        chain2<R extends Observable<T>>(func: (selector: this) => R): this {
            return new this.Ctor(subscriber => {
                func(this).subscribe(subscriber);
            }) as any;
        }
    }
}


class AsyncListEventsObservable<K, V> extends MixinChainable<AsyncResult<K, V>>(Observable) {
    private chain<R extends Observable<AsyncResult<K, V>>>(func: (selector: this) => R) {
        return new AsyncListEventsObservable<K, V>(subscriber => {
            func(this).subscribe(subscriber);
        });
    }
    filterByAttributes(predicate: (attrs: K) => boolean) {
        return this.chain2(me => me.filter(x => predicate(x.attrs)));
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
