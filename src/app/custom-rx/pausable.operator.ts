import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Timestamp } from 'rxjs/operator/timestamp';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/timestamp';

declare module 'rxjs/Observable' {
  interface Observable<T> {
    pauseReplay(pauser: Observable<any>): Observable<T>;
  }
}

Observable.prototype.pauseReplay = pauseReplay;

function pauseReplay<T>(this: Observable<T>, pauser: Observable<any>) {
  return Observable.create(obs => {
    const bufferedSource = this.timestamp().publishReplay(1);
    const connection = bufferedSource.connect();
    const subs = new Subscription();
    subs.add(connection);
    const pausable = pauser
      .switchMap(paused => !paused ? bufferedSource : Observable.empty<Timestamp<T>>())
      .distinctUntilChanged((x, y) => x === y, x => x.timestamp)
      .map(x => x.value);
    subs.add(pausable.subscribe(obs));
    return subs;
  });
}
