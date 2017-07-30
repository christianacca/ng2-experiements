import { Injectable, Provider } from '@angular/core';
import { Startable, STARTABLE } from '../../runnable';
import { delay, Deferrable, ResolveDeferred } from '../../promise-exts';

@Injectable()
@Deferrable<Startable>('startDone')
export class BootstrappedService implements Startable {
  asyncValue: string;
  startDone: Promise<void>;

  @ResolveDeferred()
  async start() {
    console.log('admin>runnable-egs>BootstrappedService.start started');
    await delay(10);
    this.asyncValue = 'A value from admin>BootstrappedService';
    console.log('admin>runnable-egs>BootstrappedService.run resolved');
  }

  constructor() {
    console.log('admin>runnable-egs>BootstrappedService.ctor');
  }
}

export const bootstrappedProviders: Provider[] = [
  BootstrappedService,
  { provide: STARTABLE, multi: true, useExisting: BootstrappedService }
];
