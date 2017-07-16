import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/interval';
import '../../../custom-rx/add/operator/apply-global-error-handler';
import { failRandomly$ } from './fail-randomly.observable';

interface Record {
  successCount: number;
  failureCount: number
};

@Component({
  template: `
    <h3>RxJs Interval error</h3>
    <h4>First subscription</h4>
    <p>
      Result: {{ results$ | async }}
    </p>
    <h4>Second subscription</h4>
    <p>
      Result: {{ results$ | async }}
    </p>
  `,
  styles: []
})
export class IntervalErrorComponent implements OnInit {
  failureCount: boolean;
  results$: Observable<number>;
  constructor() {
    const interval$ = Observable.interval(1000).startWith(0);
    // We must NOT allow errors from `failRandomly$` to propogate to the outer
    // `results$` observerable.
    // Doing so would result in `switchMap` receiving it's error event and thus
    // cause it to unsubscribe from `interval$` - effectively "killing" the interval
    // At the same time, we must also ensure that the error is NOT silently swallowed
    // - we must apply any global exception policy (eg logging the error)
    this.results$ = interval$
      .switchMap(() => failRandomly$.applyGlobalErrorHandler());
  }

  ngOnInit() {

  }
}
