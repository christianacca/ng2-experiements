import { Observable } from 'rxjs/Observable';
import { otherwiseEmpty } from '../../otherwise-empty.operator'

declare module 'rxjs/Observable' {
  interface Observable<T> {
    otherwiseEmpty: typeof otherwiseEmpty;
  }
}

Observable.prototype.otherwiseEmpty = otherwiseEmpty;
