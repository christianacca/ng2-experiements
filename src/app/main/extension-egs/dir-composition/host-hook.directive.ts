import { Directive, ChangeDetectorRef, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHostHook]'
})
export class HostHookDirective {

  constructor(cdr: ChangeDetectorRef, elemRef: ElementRef) {
    console.groupCollapsed('HostHookDirective');
    console.log(cdr);
    console.log(elemRef);
    console.groupEnd();
  }

}
