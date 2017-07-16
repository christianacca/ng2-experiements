import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/throw';
import '../../../custom-rx/add/operator/apply-global-error-handler';
import { failRandomly$ } from './fail-randomly.observable';

interface Record {
  successCount: number;
  failureCount: number
};

@Component({
  template: `
    <h3>RxJs Interval error (counted)</h3>
    <div *rxContext="let result on results$">
      <h4>First subscription</h4>
      <p>Succeeded: {{result.successCount}}</p>
      <p>Failed: {{result.failureCount}}</p>
    </div>
    <div *rxContext="let result on results$">
      <h4>Second subscription</h4>
      <p>Succeeded: {{result.successCount}}</p>
      <p>Failed: {{result.failureCount}}</p>
    </div>
  `,
  styles: []
})
export class IntervalErrorCountedComponent implements OnInit {
  failureCount: boolean;
  results$: Observable<Record>;
  constructor() {
    const interval$ = this.recordedInterval();
    this.results$ = interval$
      .switchMap(state => this.recorded(state, failRandomly$));
  }

  private recordedInterval() {
    // use `defer` to ensure that state record is NOT shared by multiple subscriptions
    const state$ = Observable.defer(() => Observable.of({ successCount: 0, failureCount: 0 }));
    const interval$ = Observable.interval(1000).startWith(0);
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

  ngOnInit() {

  }
}
