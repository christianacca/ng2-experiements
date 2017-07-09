import { Injectable, ErrorHandler } from '@angular/core';
import { ErrorEventChannelService } from './error-event-channel.service';
import { ErrorLoggerService } from './error-logger.service';
import { IRunnable } from '../../runnable';
import { applyGlobalErrorHandler } from '../../custom-rx/apply-global-error-handler.operator';

@Injectable()
export class ErrorHandlerModuleInitializer implements IRunnable {
  constructor(
    private errorEventChannelService: ErrorEventChannelService,
    private errorLogger: ErrorLoggerService,
    private errorHandler: ErrorHandler) {
  }
  run(): void | Promise<any> {
    applyGlobalErrorHandler.globalErrorHandler = this.errorHandler;
    this.errorEventChannelService.errors$.subscribe(error => {
      this.errorLogger.log(error);
    });
  }
}
