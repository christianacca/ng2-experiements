import { Observable } from 'rxjs/Observable';
import { pauseReplay } from '../../pausable.operator'

declare module 'rxjs/Observable' {
  interface Observable<T> {
    pauseReplay(pauser: Observable<any>): Observable<T>;
  }
}

Observable.prototype.pauseReplay = pauseReplay;
