import { OnInit, Component, ChangeDetectorRef, DoCheck, AfterViewInit, AfterViewChecked } from '@angular/core';
import { LayerSupertype } from './layer-supertype';

@Component({
  template: `<p>IGNORED</p>`
})
export class BaseComponent extends LayerSupertype implements OnInit, AfterViewInit, DoCheck, AfterViewChecked {

  constructor(protected cdr: ChangeDetectorRef) {
    super();
    console.log('BaseComponent.ctor');
  }

  ngOnInit() {
    console.log('BaseComponent.ngOnInit');
    // super.ngOnInit();
  }


  ngAfterViewInit(): void {
    // this is NOT called because ChildComponent omits a call to super.ngAfterViewInit
    console.log('BaseComponent.ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('BaseComponent.ngAfterViewChecked');
  }
}
