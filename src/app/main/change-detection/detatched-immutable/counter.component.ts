import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChange, SimpleChanges, Optional } from '@angular/core';
import { AttachedIfDirective } from '../../../shared/attached-if.directive';

interface Inputs extends SimpleChanges {
  value: SimpleChange;
  pauseWhenDetatched: SimpleChange;
}

@Component({
  selector: 'app-immut-counter',
  template: `
    {{value.count}}
  `,
  styles: [`
    :host { display: inline }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnChanges {
  @Input() value: { count: number };
  @Input() pauseWhenDetatched = false;

  private get isAttached() {
    if (this.attachedIf == null) { return true; }

    return this.attachedIf.isAttached;
  }

  constructor( @Optional() private attachedIf: AttachedIfDirective) {
  }

  ngOnChanges(changes: Inputs): void {
    // note: even when this component change detector is detatached the component will still
    // recieve calls to `ngOnChanges` when it's input values change
    // we use `pauseWhenDetatched` to determine whether values changes received will be "dropped"
    if (!this.isAttached && this.pauseWhenDetatched) {
      return;
    }

    console.log(`counter next: ${changes.value.currentValue.count}`);
  }
}
