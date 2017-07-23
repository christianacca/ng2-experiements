import { Injectable } from '@angular/core';
import { Startable } from '../../runnable';

@Injectable()
export class OnRun extends Startable {
  constructor() {
    super();
    console.log('admin>runnable-egs>OnRun.ctor');
  }

  start() {
    console.log('admin>runnable-egs>OnRun called');
  }
}
