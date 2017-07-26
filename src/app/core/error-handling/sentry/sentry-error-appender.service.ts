import { ErrorAppenderService, ERROR_APPENDERS } from '../error-appender.service';
import { Provider, Inject } from '@angular/core';
import * as Raven from 'raven-js';
import { STARTABLE, Configurable } from '../../../runnable';
import { Deferrable, ResolveDeferred } from '../../../promise-exts';
import { SentryConfiguratorService } from './sentry-configurator.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Deferrable<Configurable>('configDone')
export class SentryErrorAppenderService implements ErrorAppenderService, Configurable {
    configDone: Promise<void>;
    /**
     * use a replay subject to avoid missing errors raised before library is configured
     */
    private errorSubject = new ReplaySubject<any>();

    constructor(private configurator: SentryConfiguratorService) { }

    append(error: any) {
        this.errorSubject.next(error);
    }

    @ResolveDeferred()
    async configure() {
        await this.configurator.onAppStartup(Raven);
        this.errorSubject
            .subscribe(error => {
                Raven.captureException(error);
            });
    }
}

export const sentryErrorAppenderProviders: Provider[] = [
    SentryErrorAppenderService,
    {
        provide: ERROR_APPENDERS,
        useExisting: SentryErrorAppenderService,
        multi: true
    },
    { provide: STARTABLE, multi: true, useExisting: SentryErrorAppenderService }
];
