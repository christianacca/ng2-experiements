import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, DoCheck } from '@angular/core';

@Component({
  selector: 'app-clickable',
  template: `
    <h3>Clickable ( {{ attached ? 'Attached' : 'Detatched'}})</h3>
    <div>
      <button (click)="detectChanges()">detectChanges</button> (count: {{detectChangesCount}})
    </div>
    <div>
      <button (click)="markForChange()">markForChange</button> (count: {{markForChangeCount}})
    </div>
  `,
  styles: [`
    :host { display: block }
  `]
})
export class ClickableComponent implements OnChanges, DoCheck {
  @Input() attached = true;
  detectChangesCount = 0;
  markForChangeCount = 0;
  constructor(private cdr: ChangeDetectorRef) { }

  detectChanges() {
    // note: this event handler will still run even when this component is detatched
    // however, when detatched, in order for the DOM to be updated with changes we must
    // manually ask angular `detectChanges`
    this.detectChangesCount += 1;
    if (!this.attached) {
      this.cdr.detectChanges();
    }
  }

  markForChange() {
    // note: this event handler will still run even when this component is detatched
    // note: when detatched, calling `markForCheck` will NOT cause angular to update DOM
    this.markForChangeCount += 1;
    if (!this.attached) {
      this.cdr.markForCheck();
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

  ngDoCheck(): void {
    console.log(`ClickableComponent.ngDoCheck`);
  }
}
