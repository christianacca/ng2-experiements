import { Directive } from '@angular/core';
import { Service2Service } from './services';

@Directive({
  selector: '[appDiDir2]',
  providers: [Service2Service],
  exportAs: 'diDir2'
})
export class DiDir2Directive {

  constructor() { }

}
