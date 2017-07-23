import { Injectable } from '@angular/core';
import { Runnable } from '../runnable';

@Injectable()
export class OnRun extends Runnable {
  constructor() {
    super();
    console.log('runnable-egs>OnRun.ctor');
  }
  run(): void | Promise<any> {
    console.log('runnable-egs>OnRun called');
  }
}
