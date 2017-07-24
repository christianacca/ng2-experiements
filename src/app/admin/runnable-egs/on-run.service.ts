import { Injectable } from '@angular/core';
import { Startable } from '../../runnable';
import { Deferrable, ResolveDeferred } from '../../promise-exts';

@Injectable()
@Deferrable<Startable>('startDone')
export class OnRun implements Startable {
  startDone: Promise<void>;
  constructor() {
    console.log('admin>runnable-egs>OnRun.ctor');
  }

  @ResolveDeferred()
  start() {
    console.log('admin>runnable-egs>OnRun called');
  }
}
