import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/timer';
import '../../../custom-rx/add/operator/apply-global-error-handler';
import { failRandomly$ } from './fail-randomly.observable';

interface RxIntervalErrorModelData {
  frequency: number;
}

export class RxIntervalErrorModel implements RxIntervalErrorModelData {
  frequency: number;
  results$: Observable<number>;

  constructor({ frequency }: RxIntervalErrorModelData) {
    this.frequency = frequency || 1000;
    this.results$ = this.startWorkOnInterval(this.frequency);
  }

  private startWorkOnInterval(frequency: number) {
    const interval$ = Observable.timer(0, frequency);
    // We must NOT allow errors from `failRandomly$` to propogate to the outer
    // `results$` observerable.
    // Doing so would result in `switchMap` receiving it's error event and thus
    // cause it to unsubscribe from `interval$` - effectively "killing" the interval
    // At the same time, we must also ensure that the error is NOT silently swallowed
    // - we must apply any global exception policy (eg logging the error)
    return interval$
      .switchMap(() => failRandomly$.applyGlobalErrorHandler());
  }
}
