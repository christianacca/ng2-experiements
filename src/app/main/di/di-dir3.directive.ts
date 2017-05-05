import { Directive } from '@angular/core';
import { Service1Service, Service2Service } from './services';

@Directive({
  selector: '[appDiDir3]',
  exportAs: 'diDir3'
})
export class DiDir3Directive {

  constructor(public svc1: Service1Service, public svc2: Service2Service) { }

}
