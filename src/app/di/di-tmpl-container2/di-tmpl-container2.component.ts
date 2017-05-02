import { AfterContentInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';

import { DiTmplContentDirective } from './di-tmpl-content.directive';
import { Service6Service } from './../services/service6.service';

@Component({
  selector: 'app-di-tmpl-container2',
  templateUrl: './di-tmpl-container2.component.html',
  styleUrls: ['./di-tmpl-container2.component.css'],
  providers: [Service6Service]
})
export class DiTmplContainer2Component implements AfterContentInit {
  @ContentChild(DiTmplContentDirective) content: DiTmplContentDirective;
  constructor(svc6: Service6Service) {
    svc6.providedBy = 'app-di-tmpl-container2';
  }

  ngAfterContentInit() {
    console.log(this.content);
  }
}
