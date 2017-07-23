import { Injectable } from '@angular/core';
import { Startable } from '../runnable';

@Injectable()
export class OnRun extends Startable {
  constructor() {
    super();
    console.log('runnable-egs>OnRun.ctor');
  }
  start(): void | Promise<any> {
    console.log('runnable-egs>OnRun called');
  }
}
