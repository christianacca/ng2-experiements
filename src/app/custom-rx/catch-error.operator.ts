import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ObservableInput } from 'rxjs/Observable';
import { ALT_PATH_EXCEPTION } from './alt-path-exception';

const catchType = Observable;

/**
 * Catches errors (not control flow exceptions) on the observable to be handled by
 * returning a new observable or throwing an error.
 * See the `catch` operator for detailed usage.
 */
export function catchError<T, R>(
    this: Observable<T>,
    selector: (err: any, caught: Observable<T>) => ObservableInput<R>): Observable<T | R> {
    return this.catch(err =>
        err === ALT_PATH_EXCEPTION ? Observable.throw(err) : selector(err, this)
    );
}
