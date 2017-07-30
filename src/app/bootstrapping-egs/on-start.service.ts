import { Injectable } from '@angular/core';
import { Startable } from '../bootstrapping';
import { Deferrable, ResolveDeferred } from '../promise-exts';

@Injectable()
@Deferrable<Startable>('startDone')
export class OnStart implements Startable {
  startDone: Promise<void>;
  constructor() {
    console.log('runnable-egs>OnStart.ctor');
  }
  @ResolveDeferred()
  start(): void | Promise<any> {
    console.log('runnable-egs>OnStart called');
  }
}
