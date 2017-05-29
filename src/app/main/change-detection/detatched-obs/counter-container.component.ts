import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/shareReplay';


@Component({
  selector: 'app-counter-container',
  templateUrl: `./counter-container.component.html`,
  styles: []
})
export class CounterContainerComponent implements OnInit {
  counts$: Observable<number>;
  isViewUpdated = true;
  private resumes$ = new Subject<boolean>();
  constructor() { }

  ngOnInit() {
    this.counts$ = this.resumes$
      .switchMap(resume => resume ? Observable.interval(1000) : Observable.empty())
      .startWith(0)
      .scan<number>(count => count + 1)
      .shareReplay(1);
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
