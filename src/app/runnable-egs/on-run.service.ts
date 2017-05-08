import { Injectable } from '@angular/core';
import { IRunnable } from '../runnable';

@Injectable()
export class OnRun implements IRunnable {
  constructor() {
    console.log('runnable-egs>OnRun.ctor');
  }
  run(): void | Promise<any> {
    console.log('runnable-egs>OnRun called');
  }
}
