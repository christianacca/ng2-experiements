import { Directive } from '@angular/core';
import { Service1Service } from './services';

@Directive({
  selector: '[appDiDir1]',
  providers: [Service1Service],
  exportAs: 'diDir1'
})
export class DiDir1Directive {

  constructor() { }

}
