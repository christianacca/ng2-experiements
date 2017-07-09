import { NgModule, ModuleWithProviders, InjectionToken, ErrorHandler } from '@angular/core';
import { DelegatingErrorHandler } from './delegating-error-handler.service';
import { ErrorStreamHandler } from './error-stream-handler.service';
import { ngErrorHandlerProvider } from './ng-error-handler';

@NgModule({})
export class ErrorHandlingModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ErrorHandlingModule,
            providers: [
                ngErrorHandlerProvider,
                { provide: ErrorHandler, useClass: DelegatingErrorHandler }
            ]
        };
    }
}
