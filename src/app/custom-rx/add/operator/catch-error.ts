import { Observable } from 'rxjs/Observable';
import { catchError } from '../../catch-error.operator'

declare module 'rxjs/Observable' {
  // tslint:disable-next-line:no-shadowed-variable
  interface Observable<T> {
    catchError: typeof catchError;
  }
}

Observable.prototype.catchError = catchError;
