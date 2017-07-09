import { ErrorHandler, Injectable, Inject } from '@angular/core';
import { NG_ERROR_HANDLER } from './ng-error-handler';

@Injectable()
export class DelegatingErrorHandler implements ErrorHandler {
  constructor( @Inject(NG_ERROR_HANDLER) private errorHandlerImpl: ErrorHandler) {
  }
  handleError(error: any) {
    console.warn(`Error received by DelegatingErrorHandler: ${error}`);
    this.errorHandlerImpl.handleError(error);
  }
}
