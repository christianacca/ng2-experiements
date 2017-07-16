import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ObservableInput } from 'rxjs/Observable';
import { ALT_PATH_EXCEPTION } from './alt-path-exception';

/**
 * Catches control flow exceptions ({@link ALT_PATH_EXCEPTION}) on the source observable by
 * returning an `alternative`.
 * All other exceptions will be rethrown
 */
export function otherwise<T, R>(
    this: Observable<T>,
    alternative: ObservableInput<R>) {
    return this.catch(err =>
        err === ALT_PATH_EXCEPTION ? alternative : Observable.throw(err)
    );
}
