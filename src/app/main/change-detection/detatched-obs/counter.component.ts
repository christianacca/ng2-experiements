import { Component, Input, ChangeDetectionStrategy, Optional, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AttachedIfDirective } from '../../../shared/attached-if.directive';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
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

  private get isAttached() {
    if (this.attachedIf == null) { return true; }

    return this.attachedIf.isAttached;
  }

  private onAttach$: Observable<boolean>;

  constructor( @Optional() private attachedIf: AttachedIfDirective) {
    this.onAttach$ = attachedIf ? attachedIf.onAttach : new BehaviorSubject(true);
  }

  ngOnInit(): void {
    // note: even when this component change detector is detatached the component will still
    // recieve calls to emissions from `this.value`
    // we use `pauseWhenDetatched` to determine whether values emitted by `this.value` will be "dropped"
    // (ie not emitted onto `this._value$`)
    this._value$ = this.value
      .switchMap(v => this.isAttached || !this.pauseWhenDetatched ? Observable.of(v) : Observable.empty())
      .do(count => console.log(`counter next: ${count}`));
  }
}
