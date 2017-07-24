import { Injectable } from '@angular/core';
import { Startable } from '../runnable';
import { Deferrable, ResolveDeferred } from '../promise-exts';

@Injectable()
@Deferrable<Startable>('startDone')
export class OnRun implements Startable {
  startDone: Promise<void>;
  constructor() {
    console.log('runnable-egs>OnRun.ctor');
  }
  @ResolveDeferred()
  start(): void | Promise<any> {
    console.log('runnable-egs>OnRun called');
  }
}
