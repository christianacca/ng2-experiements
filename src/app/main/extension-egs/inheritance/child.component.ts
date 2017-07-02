import { Component, OnInit, ChangeDetectorRef, DoCheck, AfterViewInit } from '@angular/core';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-child',
  template: `
    <h3>
      Inheritance example (Check the console logs...)
    </h3>
  `,
  styles: []
})
export class ChildComponent extends BaseComponent implements OnInit, AfterViewInit {
  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
    console.log('ChildComponent.ctor');
  }

  ngOnInit() {
    console.log('ChildComponent.ngOnInit');
    super.ngOnInit();
  }

  // ngDoCheck(): void {
  //   console.log('ChildComponent.ngDoCheck');
  //   super.ngDoCheck();
  // }

  ngAfterViewInit(): void {
    console.log('ChildComponent.ngAfterViewInit');
    // super.ngDoCheck();
  }
}
