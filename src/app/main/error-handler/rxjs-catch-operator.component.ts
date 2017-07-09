import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import '../../custom-rx/add/operator/apply-global-error-handler';
import { AutoUnsubscribe } from '../../core';

@Component({
  template: `
    <h3>RxJs errors and catch operator example</h3>
    <div>
      <button type="button" (click)="syncError()">Sync Error</button>
      <span *ngIf="isSyncRecovered !== undefined">Recovered: {{isSyncRecovered}}</span>
    </div>
  `,
  styles: []
})
@AutoUnsubscribe
export class RxjsCatchOperatorComponent implements OnInit {
  isSyncRecovered: boolean;
  constructor() { }

  ngOnInit() {
  }

  syncError() {
    Observable.throw(new Error('sync error - BANG!'))
      .applyGlobalErrorHandler({ rethrow: true })
      .catch(err => Observable.of(true))
      .subscribe(() => {
        this.isSyncRecovered = true;
      })
  }

}
