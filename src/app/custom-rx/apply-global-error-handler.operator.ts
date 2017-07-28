import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import { ErrorHandler } from '@angular/core';
import { ObservableInput } from 'rxjs/Observable';

/**
 * Ensures errors on the source observable are sent to {@link ErrorHandler}.
 * By default an error will not be rethrown and instead cause the observable
 * to complete
 *
 * @example <caption>Notifiy and then completes observable</caption>
 *
 * Observable.interval(30)
 *   .switchMap(() => failRandomly$.applyGlobalErrorHandler())
 *   .subscribe(
 *     x => console.log(x),
 *     err => {
 *       // never reached
 *     }
 *   );
 *   // ---x--x--x-----x--x--------x--x ...
 *
 * @example <caption>Notifiy and then continues with a different Observable</caption>
 *
 * Observable.of(1, 2, 3)
 *   .map(n => {
 *     if (n > 2) {
 *       throw new Error();
 *     }
 *     return n;
 *   })
 *   .applyGlobalErrorHandler(err => {
 *     return Observable.of(4)
 *   })
 *   .subscribe(
 *     x => console.log(x),
 *     err => {
 *       // never reached
 *     }
 *   );
 *   // 1,2,4
 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 * @return {Observable} An observable that originates from either the source or the observable returned by the
 *  catch `selector` function.
 * @method applyGlobalErrorHandler
 * @name applyGlobalErrorHandler
 * @owner Observable
 */
export function applyGlobalErrorHandler<T, R = T>(
    this: Observable<T>,
    selector?: (err: any, caught: Observable<T>) => ObservableInput<R>): Observable<T | R> {
    return this.catch(error => {
        applyGlobalErrorHandler.globalErrorHandler.handleError(error);
        return selector ? selector(error, this) : Observable.empty<T>();
    })
}

export namespace applyGlobalErrorHandler {
    export let globalErrorHandler: ErrorHandler;
}
