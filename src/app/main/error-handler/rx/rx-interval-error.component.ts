import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/interval';
import '../../../custom-rx/add/operator/apply-global-error-handler';
import { failRandomly$ } from './fail-randomly.observable';
import { ActivatedRoute, Router } from '@angular/router';

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
    <p>
      <label>
        Interval Frequency: <input type="number" [value]="frequency$ | async" #freq/>
      </label>
      <a href="" (click)="changeFrequency(freq.value); $event.preventDefault()">Change</a>
    </p>
  `,
  styles: []
})
export class RxIntervalErrorComponent {
  frequency$: Observable<number>;
  results$: Observable<number>;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.frequency$ = route.paramMap
      .map(paramsMap => parseInt(paramsMap.get('frequency'), 10) || 1000);

    this.results$ = this.frequency$
      .switchMap(freq => this.startWorkOnInterval(freq));
  }

  changeFrequency(frequency: string) {
    this.router.navigate(['.', { frequency }], { relativeTo: this.route })
  }

  private startWorkOnInterval(frequency: number) {
    const interval$ = Observable.interval(frequency).startWith(0);
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
