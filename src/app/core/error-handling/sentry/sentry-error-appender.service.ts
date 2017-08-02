import { ErrorAppenderService, ERROR_APPENDERS } from '../error-appender.service';
import { Provider, Inject } from '@angular/core';
import * as Raven from 'raven-js';
import { BOOTSTRAPPABLE, Configurable } from '../../../bootstrapping';
import { Deferrable, ResolveDeferred } from '../../../promise-exts';
import { SentryConfiguratorService } from './sentry-configurator.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';

@Deferrable<Configurable>('configDone')
export class SentryErrorAppenderService extends Configurable implements ErrorAppenderService {
    private errorSubject = new Subject<any>();

    constructor(private configurator: SentryConfiguratorService) {
        super();
        this.nonLossyErrors()
            .subscribe(error => {
                Raven.captureException(error);
            });
    }

    private nonLossyErrors() {
        const delayUntilConfigDone$ = this.errorSubject.delay(0).debounce(() => Observable.from(this.configDone));
        return this.errorSubject
            .buffer(delayUntilConfigDone$)
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
    { provide: BOOTSTRAPPABLE, multi: true, useExisting: SentryErrorAppenderService }
];
