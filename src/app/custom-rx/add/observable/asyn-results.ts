import { AsyncResult, AsyncResultsObservable } from '../../async-results';
import { Observable } from 'rxjs/Observable';

function fromAsynResultsStatic<T, R>(results: AsyncResult<T, R>[]): AsyncResultsObservable<T, R> {
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
