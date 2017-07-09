import { NgModule, ModuleWithProviders, InjectionToken, ErrorHandler } from '@angular/core';
import { DelegatingErrorHandler } from './delegating-error-handler.service';
import { ErrorStreamHandler } from './error-stream-handler.service';

export const DEFAULT_ERROR_HANDLER = new InjectionToken('defaultErrorHandler');

export const TEST_CONFIG = new InjectionToken('test');

@NgModule({})
export class ErrorHandlingModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ErrorHandlingModule,
            providers: [
                { provide: TEST_CONFIG, useValue: 'some value'},
                { provide: DEFAULT_ERROR_HANDLER, useFactory: () => new ErrorHandler() },
                { provide: ErrorHandler, useClass: ErrorStreamHandler }
            ]
        };
    }
}
