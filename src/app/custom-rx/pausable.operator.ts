import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Timestamp } from 'rxjs/operator/timestamp';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/timestamp';

/**
 * Note that this is a poor implementation of
 * [pausableBuffered](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/pausablebuffered.md)
 */
export function pauseReplay<T>(this: Observable<T>, pauser: Observable<any>) {
  return Observable.create(obs => {
    const bufferedSource = this.timestamp().publishReplay(1);
    const pausable = pauser
      .switchMap(paused => !paused ? bufferedSource : Observable.empty<Timestamp<T>>())
      .distinctUntilChanged((x, y) => x === y, x => x.timestamp)
      .map(x => x.value);
    const subs = new Subscription();
    subs.add(pausable.subscribe(obs));
    const connection = bufferedSource.connect();
    subs.add(connection);
    return subs;
  });
}
