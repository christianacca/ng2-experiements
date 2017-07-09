import { Injectable, Inject, ErrorHandler, Provider } from '@angular/core';
import { NG_ERROR_HANDLER } from './ng-error-handler';
import { ErrorAppenderService, ERROR_APPENDERS } from './error-appender.service';

@Injectable()
export class ConsoleErrorAppenderService implements ErrorAppenderService {
  constructor( @Inject(NG_ERROR_HANDLER) private ngErrorHandler: ErrorHandler) { }

  append(error: any) {
    this.ngErrorHandler.handleError(error);
  }
}

const consoleErrorAppenderProvider: Provider = {
  provide: ERROR_APPENDERS,
  useExisting: ConsoleErrorAppenderService,
  multi: true
};

export const consoleErrorAppenderProviders = [
  ConsoleErrorAppenderService,
  consoleErrorAppenderProvider
];
