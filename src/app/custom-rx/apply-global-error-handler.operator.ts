import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import { ErrorHandler } from '@angular/core';

export function applyGlobalErrorHandler(this: Observable<any>, { rethrow = false } = {}) {
    return this.catch(error => {
        applyGlobalErrorHandler.globalErrorHandler.handleError(error);
        return rethrow ? Observable.throw(error) : Observable.empty();
    })
}

export namespace applyGlobalErrorHandler {
    export let globalErrorHandler: ErrorHandler;
}
