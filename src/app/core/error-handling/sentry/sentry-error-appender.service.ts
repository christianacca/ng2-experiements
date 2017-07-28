import { ErrorAppenderService, ERROR_APPENDERS } from '../error-appender.service';
import { Provider, Inject } from '@angular/core';
import * as Raven from 'raven-js';
import { STARTABLE, Configurable } from '../../../runnable';
import { Deferrable, ResolveDeferred } from '../../../promise-exts';
import { SentryConfiguratorService } from './sentry-configurator.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';

@Deferrable<Configurable>('configDone')
export class SentryErrorAppenderService implements ErrorAppenderService, Configurable {
    configDone: Promise<void>;
    isBlocking = false;
    private errorSubject = new Subject<any>();

    constructor(private configurator: SentryConfiguratorService) {
        this.nonLossyErrors()
            .subscribe(error => {
                console.log(error.count);
                Raven.captureException(error.error);
            });
    }

    private nonLossyErrors() {
        return this.errorSubject
            .buffer(this.errorSubject.debounce(() => Observable.from(this.configDone)))
            .switchMap(errors => errors);
    }

    append(error: any) {
        this.errorSubject.next(error);
    }

    @ResolveDeferred()
    async configure() {
        await this.configurator.onAppStartup(Raven);
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
