import { AsyncResult } from '../../async-results/async-result';
import { fromAsyncResultsStatic, toAsyncResultsStatic } from '../../async-results/async-results.observable';
import { Observable, SubscribableOrPromise } from 'rxjs/Observable';
import { ObservableInput, Subscribable } from 'rxjs/Observable';

declare module 'rxjs/Observable' {
    // tslint:disable-next-line:no-shadowed-variable
    namespace Observable {
        export let fromAsyncResults: typeof fromAsyncResultsStatic;
        export let toAsyncResults: typeof toAsyncResultsStatic;
    }
}

Observable.fromAsyncResults = fromAsyncResultsStatic;
Observable.toAsyncResults = toAsyncResultsStatic;
