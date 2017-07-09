import { ErrorHandler, Injectable, Inject } from '@angular/core';

@Injectable()
export class ErrorStreamHandler implements ErrorHandler {
    defaultErrorHandler: ErrorHandler;

    constructor() {
        this.defaultErrorHandler = new ErrorHandler();
    }

    handleError(error: any) {
        console.log(`Error received by ErrorStreamHandler: ${error}`);
        this.defaultErrorHandler.handleError(error);
    }

    notifiy(error: any) {
    }
}
