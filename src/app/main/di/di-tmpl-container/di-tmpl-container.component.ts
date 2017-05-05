import { Component, Input, OnInit, TemplateRef } from '@angular/core';

import { Service6Service } from './../services/service6.service';

@Component({
  selector: 'app-di-tmpl-container',
  templateUrl: './di-tmpl-container.component.html',
  styleUrls: ['./di-tmpl-container.component.css'],
  providers: [Service6Service]
})
export class DiTmplContainerComponent {
  @Input() template: TemplateRef<any>;
  constructor(svc6: Service6Service) {
    svc6.providedBy = 'app-di-tmpl-container';
  }

}
