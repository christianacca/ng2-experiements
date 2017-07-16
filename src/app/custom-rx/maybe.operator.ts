import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { ALT_PATH_EXCEPTION } from './alt-path-exception';

/**
 * Use `predicate` to decide whether or not values on the source observable should be allowed
 * to pass through as a successful next value.
 * Unsuccessful values will instead result in {@link ALT_PATH_EXCEPTION} to be sent along the
 * error channel to the downstream observer
 */
export function maybe<T>(this: Observable<T>, predicate: (value: T) => boolean) {
    return this.switchMap(value =>
        predicate(value) ? Observable.of(value) : Observable.throw(ALT_PATH_EXCEPTION)
    );
}
