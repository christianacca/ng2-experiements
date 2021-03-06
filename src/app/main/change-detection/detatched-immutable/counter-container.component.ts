import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-immut-counter-container',
  templateUrl: `./counter-container.component.html`,
  styles: []
})
export class CounterContainerComponent implements OnInit {
  counts$: Observable<{ count: number }>;
  private resumes$ = new Subject<boolean>();
  isViewUpdated = true;
  constructor() { }

  ngOnInit() {
    this.counts$ = this.createCounts$();
  }

  private createCounts$() {
    // note: we need to create a NEW object as counter.component uses OnPush
    return this.resumes$
      .switchMap(resume => resume ? Observable.interval(2000) : Observable.empty<number>())
      .startWith(0)
      .scan(({ count }) => ({ count: ++count }), { count: -1 })
      .do(counter => console.log(`counter.container: ${counter.count}`))
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
