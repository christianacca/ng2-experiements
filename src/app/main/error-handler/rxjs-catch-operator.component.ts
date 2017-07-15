import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import '../../custom-rx/add/operator/apply-global-error-handler';
import { AutoUnsubscribe } from '../../core';

@Component({
  template: `
    <h3>RxJs errors and catch operator example</h3>
    <div *rxContext="let result on results$">
      <p>Succeeded: {{result.successCount}}</p>
      <p>Failed: {{result.failureCount}}</p>
    </div>
  `,
  styles: []
})
@AutoUnsubscribe
export class RxjsCatchOperatorComponent implements OnInit {
  failureCount: boolean;
  results$: Observable<{ successCount: number; failureCount: number }>;
  constructor() {
    this.results$ = Observable.of({ successCount: 0, failureCount: 0 })
      .combineLatest(Observable.interval(1000).startWith(0), (x) => x)
      .switchMap(x => this.doAsyncWork()
        .do(() => {
          x.successCount += 1;
        })
        .mapTo(x)
        .applyGlobalErrorHandler({ rethrow: true })
        .catch(err => {
          x.failureCount += 1;
          return Observable.of(x)
        })
      );
  }

  doAsyncWork() {
    return Observable.of(Math.ceil(Math.random() * 10))
      .delay(100)
      .switchMap(n => n % 2 === 0
        ? Observable.of(n)
        : Observable.throw(new Error(`error ${n}`)));
  }

  ngOnInit() {

  }
}
