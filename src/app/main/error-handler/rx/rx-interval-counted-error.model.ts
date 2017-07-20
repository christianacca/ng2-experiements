import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import '../../../custom-rx/add/operator/apply-global-error-handler';
import { failRandomly$ } from './fail-randomly.observable';

interface Record {
    successCount: number;
    failureCount: number
};

interface RxIntervalCountedErrorModelData {
    frequency: number;
}

export class RxIntervalCountedErrorModel implements RxIntervalCountedErrorModelData {
    frequency: number;
    results$: Observable<Record>;

    constructor({ frequency }: RxIntervalCountedErrorModelData) {
        this.frequency = frequency || 1000;
        this.startWorkOnInterval(this.frequency);
    }

    private interval(frequency: number) {
        // use `defer` to ensure that state record is NOT shared by multiple subscriptions
        const state$ = Observable.defer(() => Observable.of({ successCount: 0, failureCount: 0 }));
        const interval$ = Observable.timer(0, frequency);
        return state$.combineLatest(interval$, state => state);
    }

    private recorded(state: Record, source$: Observable<any>) {
        // `source$` is an "inner" observable to an outer observable that must not
        // die. Therefore `source$` must NOT emit an error.
        // At the same time, we must ensure that an error is NOT silently swallowed
        // - we must apply any global exception policy (eg logging the error)
        return source$
            .do(() => {
                state.successCount += 1;
            })
            .mapTo(state)
            .applyGlobalErrorHandler(err => {
                state.failureCount += 1;
                return Observable.of(state)
            });
    }

    private startWorkOnInterval(frequency: number) {
        this.results$ = this.interval(this.frequency)
            .switchMap(state => this.recorded(state, failRandomly$));
    }
}
