import { Component, Input, ChangeDetectionStrategy, Optional, SimpleChanges, SimpleChange, OnChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AttachedIfDirective } from '../../../shared/attached-if.directive';

import '../../../custom-rx/pausable.operator';
import 'rxjs/add/operator/do';

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
  @Input() value: Observable<number>;

  @Input() pauseWhenDetatched = false;

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
      const pauses = this.attachedIf.onAttach.map(attached => !attached);
      this.currentValue = this.value.pauseReplay(pauses);
    } else {
      this.currentValue = this.value;
    }
    this.currentValue = this.currentValue.do(count => console.log(`counter: ${count}`));
  }
}
