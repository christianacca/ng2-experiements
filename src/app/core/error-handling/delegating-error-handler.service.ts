import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class DelegatingErrorHandler extends ErrorHandler {
  constructor() {
    super();
  }
  handleError(error: any) {
    console.warn(`Error received by DelegatingErrorHandler: ${error}`);
    super.handleError(error);
  }
}
