import { ErrorAppenderService, ERROR_APPENDERS } from './error-appender.service';
import { Provider } from '@angular/core';
import * as Raven from 'raven-js';

Raven
    .config('https://9087265ea8e54d63b8848c9d7bf104a1@sentry.io/191875')
    .install();

export class SentryErrorAppenderService implements ErrorAppenderService {
    append(error: any) {
        Raven.captureException(error);
    }
}

export const sentryErrorAppenderProvider: Provider = {
    provide: ERROR_APPENDERS,
    useClass: SentryErrorAppenderService,
    multi: true
};
