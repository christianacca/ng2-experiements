import { ErrorHandler, Injectable, Inject } from '@angular/core';
import { DEFAULT_ERROR_HANDLER, TEST_CONFIG } from './error-handling.module';

@Injectable()
export class ErrorStreamHandler implements ErrorHandler {
    defaultErrorHandler: ErrorHandler;

    constructor(@Inject(TEST_CONFIG) testConfig: string) {
        console.log(testConfig);
        this.defaultErrorHandler = new ErrorHandler();
    }

    handleError(error: any) {
        console.log(`Error received by ErrorStreamHandler: ${error}`);
        this.defaultErrorHandler.handleError(error);
    }

    notifiy(error: any) {
    }
}
