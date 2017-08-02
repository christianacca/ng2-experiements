import { Injectable, ErrorHandler, Provider, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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
    errors$: Observable<any>;

    constructor(private ngZone: NgZone) {
        this.errors$ = this.errorsSubject
            .filter(err => err.isError !== false)
            .distinctUntilChanged();
    }
    publish(error: any) {
        this.errorsSubject.next(error);
    }
    handleError(error: any) {
        // note: as of angular 4.3.2 `handleError` will be run outside of the angular zone
        // whenever angular itself is calling `handleError`
        // (see https://github.com/angular/angular/pull/18269)
        // However, direct calls to `handleError` might be made by user land code that
        // is running inside the angular zone.
        // So to maintain consistency we want to ensure all call are running outside of the zone
        this.ngZone.runOutsideAngular(() => {
            this.publish(error);
        });
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
