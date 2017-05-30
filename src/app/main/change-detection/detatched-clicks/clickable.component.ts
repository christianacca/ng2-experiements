import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-clickable',
  template: `
    <h3>Clickable ( {{ attached ? 'Attached' : 'Detatched'}})</h3>
    <div>
      <button (click)="clickMe()">Click Me</button> (count: {{clickCount}})
    </div>
  `,
  styles: [`
    :host { display: block }
  `]
})
export class ClickableComponent implements OnChanges {
  @Input() attached = true;
  clickCount = 0;
  constructor(private cdr: ChangeDetectorRef) { }

  clickMe() {
    // note: this event handler will still run even when this component is detatched
    // however, when detatched, in order for the view to be updated with the current value
    // of `clickCount` we must manually ask angular to `detectChanges`
    this.clickCount += 1;
    if (!this.attached) {
      this.cdr.detectChanges();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isAttached = changes['attached'].currentValue as boolean;
    if (isAttached && !changes['attached'].isFirstChange()) {
      this.cdr.reattach();
    } else if (!isAttached) {
      this.cdr.detach();
      // now we're detatached we need to manually tell angular to detect changes to the
      // `{{ attached ? 'Attached' : 'Detatched'}}` binding
      this.cdr.detectChanges();
    }
  }
}
