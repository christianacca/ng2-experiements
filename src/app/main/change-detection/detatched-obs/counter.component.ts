import { Component, Input, ChangeDetectionStrategy, Optional, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AttachedIfDirective } from '../../../shared/attached-if.directive';

import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-counter',
  template: `
    {{_value$ | async}}
  `,
  styles: [`
    :host { display: block }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  @Input() value: Observable<number>;
  @Input() pauseWhenDetatched = false;

  public _value$: Observable<number>;
  private onAttach$: Observable<boolean>;

  constructor( @Optional() attachedIf: AttachedIfDirective) {
    this.onAttach$ = attachedIf ? attachedIf.onAttach : new BehaviorSubject(true);
  }

  ngOnInit(): void {
    this._value$ = this.onAttach$
      .switchMap(attached => attached || !this.pauseWhenDetatched ? this.value : Observable.empty())
      .do(count => console.log(`counter next: ${count}`));
  }
}
