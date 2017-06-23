import { Component, Input, ChangeDetectionStrategy, Optional, SimpleChanges, SimpleChange, OnChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { AttachedIfDirective } from '../../../shared/attached-if.directive';

import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/window';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/timestamp';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/takeUntil';

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
  valueSubs: Subscription;
  @Input() value: Observable<number>;

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
    // (ie not emitted onto `this.currentValue`)

    if (this.pauseWhenDetatched && this.attachedIf) {
      const t = this.attachedIf.onAttach
        .map(isAttached => ({ values: this.value.takeUntil(this.attachedIf.onAttach), isAttached}))
        .switchMap(x => x.isAttached ? x.values : x.values.last());
    } else {
      this.currentValue = this.value;
    }
    this.currentValue = this.currentValue.do(count => console.log(`counter: ${count}`));
  }
}
