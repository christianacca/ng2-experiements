import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-child',
  template: `
    <p>
      child Works!
    </p>
  `,
  styles: []
})
export class ChildComponent extends BaseComponent implements OnInit {

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
    console.log('ChildComponent.ctor');
  }

  ngOnInit() {
  }

}
