import { Injectable } from '@angular/core';
import { Runnable } from '../../runnable';

@Injectable()
export class OnRun extends Runnable {
  constructor() {
    super();
    console.log('admin>runnable-egs>OnRun.ctor');
  }

  run() {
    console.log('admin>runnable-egs>OnRun called');
  }
}
