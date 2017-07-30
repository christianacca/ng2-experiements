import { Injectable, ErrorHandler } from '@angular/core';
import { ErrorEventChannelService } from './error-event-channel.service';
import { ErrorLoggerService } from './error-logger.service';
import { Configurable, ConfigurableAttrs } from '../../bootstrapping';
import { applyGlobalErrorHandler } from '../../custom-rx/apply-global-error-handler.operator';
import { Deferrable, ResolveDeferred } from '../../promise-exts';

@Injectable()
@Deferrable<Configurable>('configDone')
export class ErrorHandlerModuleInitializer implements Configurable {
  attributes = ConfigurableAttrs.create({ isBlocking: true });
  configDone: Promise<void>;
  constructor(
    private errorEventChannelService: ErrorEventChannelService,
    private errorLogger: ErrorLoggerService,
    private errorHandler: ErrorHandler) {
  }

  @ResolveDeferred()
  configure(): void | Promise<any> {
    applyGlobalErrorHandler.globalErrorHandler = this.errorHandler;
    this.errorEventChannelService.errors$.subscribe(error => {
      this.errorLogger.log(error);
    });
  }
}
