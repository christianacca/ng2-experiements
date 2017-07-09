import { Observable } from 'rxjs/Observable';
import { pauseReplay } from '../../pausable.operator'

declare module 'rxjs/Observable' {
  interface Observable<T> {
    pauseReplay: typeof pauseReplay;
  }
}

Observable.prototype.pauseReplay = pauseReplay;
