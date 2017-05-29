import { Component, Input, ChangeDetectionStrategy, Optional, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AttachedIfDirective } from '../../../shared/attached-if.directive';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/withLatestFrom';

interface Inputs extends SimpleChanges {
  value: SimpleChange;
  pauseWhenDetatched: SimpleChange;
}

@Component({
  selector: 'app-counter',
  template: `
    {{currentValue | async}}
  `,
  styles: [`
    :host { display: block }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnChanges {

  currentValue: Observable<number>;

  // tslint:disable-next-line:no-input-rename
  @Input('value') rawValue: Observable<number>;

  @Input() pauseWhenDetatched = false;

  sourceValue: Observable<number>;

  private get isAttached() {
    if (this.attachedIf == null) { return true; }

    return this.attachedIf.isAttached;
  }

  constructor( @Optional() private attachedIf: AttachedIfDirective) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // recieve calls to emissions from `this.value`
    // we use `pauseWhenDetatched` to determine whether values emitted by `this.value` will be "dropped"
    // (ie not emitted onto `this._value$`)

    if (this.pauseWhenDetatched && this.attachedIf) {
      const value = this.rawValue.share();
      const attachedValue = value.switchMap(v => this.isAttached ? Observable.of(v) : Observable.empty())
        .do(count => console.log(`counter next: ${count}`));
      const reattachValue = this.attachedIf.onAttach.withLatestFrom(value, (_, v) => v);
      this.currentValue = Observable.merge(attachedValue, reattachValue);
    } else {
      this.currentValue = this.rawValue.do(count => console.log(`counter next: ${count}`));
    }
  }
}
