import { NgModule, ModuleWithProviders, InjectionToken, ErrorHandler } from '@angular/core';
import { DelegatingErrorHandler } from './delegating-error-handler.service';
import { errorEventChannelProviders, ErrorEventChannelService } from './error-event-channel.service';
import { ngErrorHandlerProvider } from './ng-error-handler';
import { consoleErrorAppenderProviders } from './console-error-appender.service';
import { ErrorLoggerService } from './error-logger.service';

@NgModule()
export class ErrorHandlingModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ErrorHandlingModule,
            providers: [
                ngErrorHandlerProvider,
                consoleErrorAppenderProviders,
                errorEventChannelProviders,
                ErrorLoggerService
            ]
        };
    }
}
