import { Injectable } from '@angular/core';
import { IRunnable } from '../../runnable';

@Injectable()
export class OnRun implements IRunnable {
  constructor() {
    console.log('admin>runnable-egs>OnRun.ctor');
  }

  run(): void | Promise<any> {
    console.log('admin>runnable-egs>OnRun called');
  }
}
