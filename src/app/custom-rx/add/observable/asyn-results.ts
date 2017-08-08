import { AsyncResult, AsyncResultsObservable } from '../../async-results';
import { Observable, SubscribableOrPromise } from 'rxjs/Observable';
import { ObservableInput, Subscribable } from 'rxjs/Observable';

export type ArrayOrObservable<T> = ArrayLike<T> | Subscribable<T>

function fromAsynResultsStatic<K, V>(
    results: ArrayOrObservable<AsyncResult<K, V>>): AsyncResultsObservable<K, V> {
    return new AsyncResultsObservable(subscriber => {
        return Observable.from(results).subscribe(subscriber);
    });
}

declare module 'rxjs/Observable' {
    // tslint:disable-next-line:no-shadowed-variable
    namespace Observable {
        export let fromAsynResults: typeof fromAsynResultsStatic;
    }
}

Observable.fromAsynResults = fromAsynResultsStatic;
