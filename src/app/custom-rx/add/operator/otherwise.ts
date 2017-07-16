import { Observable } from 'rxjs/Observable';
import { otherwise } from '../../otherwise.operator'

declare module 'rxjs/Observable' {
  interface Observable<T> {
    otherwise: typeof otherwise;
  }
}

Observable.prototype.otherwise = otherwise;
