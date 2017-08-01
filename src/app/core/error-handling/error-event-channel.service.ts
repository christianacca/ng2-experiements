import { Injectable, ErrorHandler, Provider } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { asap } from 'rxjs/scheduler/asap';
import 'rxjs/add/operator/observeOn';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';

export abstract class ErrorEventChannelService {
    errors$: Observable<any>;
    abstract publish(error: any);
}

@Injectable()
// tslint:disable-next-line:class-name
export class _ErrorEventChannelServiceImpl implements ErrorEventChannelService, ErrorHandler {
    private errorsSubject = new Subject<any>();
    errors$ = this.errorsSubject
        .filter(err => err.isError !== false)
        .distinctUntilChanged();
    publish(error: any) {
        this.errorsSubject.next(error);
    }
    handleError(error: any) {
        // note: as of angular 4.3.2 `handleError` is running outside of the angular zone
        // (see https://github.com/angular/angular/pull/18269)
        this.publish(error);
    }
}

const errorEventChannelProvider: Provider = {
    provide: ErrorEventChannelService,
    useClass: _ErrorEventChannelServiceImpl
};
const errorHandlerProvider: Provider = {
    provide: ErrorHandler,
    useExisting: ErrorEventChannelService
};

export const errorEventChannelProviders = [
    errorEventChannelProvider,
    errorHandlerProvider
];
