import { Component, OnInit} from '@angular/core';
import { MixinLifecycleEvents, LifecycleEventsBase } from '../../../core';

@Component({
  template: `
    <h3>
      Mixin inheritance example (Check the console logs...)
    </h3>
    <div>
      <button type="button" (click)="0;">Trigger Change</button>
    </div>
  `,
  styles: []
})
@MixinLifecycleEvents()
export class InheritingComponent extends LifecycleEventsBase implements OnInit {

  constructor() { super(); }

  ngOnInit() {
    console.log('InheritingComponent.ngOnInit');
    this.lifecycle$.subscribe(evt => { console.log(evt); });
  }
}
