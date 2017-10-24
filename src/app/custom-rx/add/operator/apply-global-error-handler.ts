import { Observable } from 'rxjs/Observable';
import { applyGlobalErrorHandler } from '../../apply-global-error-handler.operator'
import { ErrorHandler } from '@angular/core';

declare module 'rxjs/Observable' {
  // tslint:disable-next-line:no-shadowed-variable
  interface Observable<T> {
    applyGlobalErrorHandler: typeof applyGlobalErrorHandler;
  }
}

Observable.prototype.applyGlobalErrorHandler = applyGlobalErrorHandler;
