import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/observeOn';

import 'rxjs/add/observable/interval';

import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { asap } from 'rxjs/scheduler/asap';

@Component({
  selector: 'app-rxjs-err-async-pipe',
  templateUrl: './rxjs-err-async-pipe.component.html',
  styleUrls: ['./rxjs-err-async-pipe.component.css']
})
export class RxjsErrAsyncPipeComponent implements OnInit {
  ticks$: Observable<number>;
  mapped$: Observable<{ value: number }>;
  constructor(errorHandler: ErrorHandler) {
    // Scheduler.asap required to prevent error thrown in mapped$ to also cause ticks$ to stop
    // For discussion of this problem see:
    // https://medium.com/@benlesh/on-the-subject-of-subjects-in-rxjs-2b08b7198b93#3114
    // Follow rxjs issue to track whether this workaround is still required:
    // https://github.com/ReactiveX/rxjs/issues/2145

    // Note: side effect of `observeOn(Scheduler.asap)` is angular's `ErrorHandler.handleError` is not invoked

    this.ticks$ = Observable.interval(1000).take(10)
      .share()
      .observeOn(asap);

    this.mapped$ = this.ticks$.map(value => {
      if (value === 3) {
        throw new Error('oops');
      }
      return { value };
    });
  }

  ngOnInit() {
  }

}
