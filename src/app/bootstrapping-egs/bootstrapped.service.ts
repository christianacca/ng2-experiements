import { Injectable, Provider } from '@angular/core';
import { Startable, BOOTSTRAPPABLE } from '../bootstrapping';
import { delay, Deferrable, ResolveDeferred } from '../promise-exts';

@Injectable()
@Deferrable<Startable>('startDone')
export class BootstrappedService extends Startable {
  asyncValue: string;

  @ResolveDeferred()
  async start() {
    console.log('runnable-egs>BootstrappedService.start started');
    await delay(10);
    this.asyncValue = 'A value from BootstrappedService';
    console.log('runnable-egs>BootstrappedService.run resolved');
  }

  constructor() {
    super();
    console.log('runnable-egs>BootstrappedService.ctor');
  }
}

export const bootstrappedProviders: Provider[] = [
  BootstrappedService,
  { provide: BOOTSTRAPPABLE, multi: true, useExisting: BootstrappedService }
];
