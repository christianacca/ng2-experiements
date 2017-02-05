import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDiDirTmplContainer]'
})
export class DiDirTmplContainerDirective {

  constructor(view: ViewContainerRef, template: TemplateRef<any>) { 
    view.createEmbeddedView(template);
  }

}
