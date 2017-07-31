import { Injectable } from '@angular/core';
import { Startable } from '../../bootstrapping';
import { Deferrable, ResolveDeferred } from '../../promise-exts';

@Injectable()
@Deferrable<Startable>('startDone')
export class OnRun extends Startable {
  constructor() {
    super();
    console.log('admin>runnable-egs>OnRun.ctor');
  }

  @ResolveDeferred()
  start() {
    console.log('admin>runnable-egs>OnRun called');
  }
}
