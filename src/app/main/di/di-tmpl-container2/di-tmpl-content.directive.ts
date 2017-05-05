import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDiTmplContent]'
})
export class DiTmplContentDirective {

  constructor(public viewContainerRef: ViewContainerRef, public templateRef: TemplateRef<any>) { }

}
