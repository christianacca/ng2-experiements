import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { Service6Service } from './services/service6.service';

@Directive({
  selector: '[appDiDirTmplContainer]',
  providers: [Service6Service]
})
export class DiDirTmplContainerDirective {

  constructor(view: ViewContainerRef, template: TemplateRef<any>, svc6: Service6Service) {
    svc6.providedBy = 'appDiDirTmplContainer';
    view.createEmbeddedView(template);
  }

}
