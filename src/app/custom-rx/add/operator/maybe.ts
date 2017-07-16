import { Observable } from 'rxjs/Observable';
import { maybe } from '../../maybe.operator'

declare module 'rxjs/Observable' {
  interface Observable<T> {
    maybe: typeof maybe;
  }
}

Observable.prototype.maybe = maybe;
