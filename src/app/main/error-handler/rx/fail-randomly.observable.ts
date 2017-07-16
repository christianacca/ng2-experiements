import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/defer';

export const failRandomly$ = Observable.defer(() => Observable.of(Math.ceil(Math.random() * 10)))
    .delay(100)
    .switchMap(n => n % 2 === 0
        ? Observable.of(n)
        : Observable.throw(new Error(`error ${n}`)));
