import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-counter-container',
  templateUrl: `./counter-container.component.html`,
  styles: []
})
export class CounterContainerComponent implements OnInit {
  counts$: Observable<number>;
  resumes$ = new Subject<boolean>();
  isViewUpdated = true;
  constructor() { }

  ngOnInit() {
    this.counts$ = this.resumes$
      .switchMap(resume => resume ? Observable.interval(100) : Observable.empty())
      .scan(count => ++count, 0);
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
