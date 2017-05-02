import { Directive } from '@angular/core';
import { Service5Service } from './services';

@Directive({
  selector: '[appDiDir5]',
  providers: [Service5Service]
})
export class DiDir5Directive {

  constructor(private svc5: Service5Service) {
    this.svc5.providedBy = 'appDiDir5';
  }

}
