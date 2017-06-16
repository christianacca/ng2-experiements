import { OnInit, Component, ChangeDetectorRef } from '@angular/core';

@Component({
  template: `<p>IGNORE ME</p>`
})
export class BaseComponent implements OnInit {

  constructor(protected cdr: ChangeDetectorRef) {
    console.log('BaseComponent.ctor');
  }

  ngOnInit() {
  }

}
