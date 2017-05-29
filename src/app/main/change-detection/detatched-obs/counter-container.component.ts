import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishBehavior';


@Component({
  selector: 'app-counter-container',
  templateUrl: `./counter-container.component.html`,
  styles: []
})
export class CounterContainerComponent implements OnInit, OnDestroy {
  counts$: ConnectableObservable<number>;
  isViewUpdated = true;
  private countsSubs: Subscription;
  private resumes$ = new Subject<boolean>();
  constructor() { }

  ngOnInit() {
    this.counts$ = this.resumes$
      .switchMap(resume => resume ? Observable.interval(1000) : Observable.empty())
      .scan<number>(count => count + 1, 0)
      .publishBehavior(0);
    this.countsSubs = this.counts$.connect();
  }

  ngOnDestroy(): void {
    this.countsSubs.unsubscribe();
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
