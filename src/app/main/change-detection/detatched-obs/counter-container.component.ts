import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { AutoUnsubscribe } from '../../../core';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishBehavior';


@Component({
  selector: 'app-counter-container',
  templateUrl: `./counter-container.component.html`,
  styles: []
})
@AutoUnsubscribe
export class CounterContainerComponent implements OnInit {
  counts$: ConnectableObservable<number>;
  isViewUpdated = true;
  private countsSubs: Subscription;
  private resumes$ = new Subject<boolean>();
  constructor() { }
  ngOnInit() {
    // note: we're using a connectable observable rather than a refCount based operator to share
    // the counter observable. This is to avoid our count resetting if all out subscribers decide
    // to unsubscribe and then resubscribe
    this.counts$ = this.resumes$
      .switchMap(resume => resume ? Observable.interval(1000) : Observable.empty())
      .scan<number>(count => count + 1, 0)
      .do(count => console.log(`counter-countainer: ${count}`))
      .publishBehavior(0);
    this.countsSubs = this.counts$.connect();
  }

  start() {
    this.resumes$.next(true);
  }

  stop() {
    this.resumes$.next(false);
  }

  toggleChangeDetection() {
    this.isViewUpdated = !this.isViewUpdated;
  }
}
