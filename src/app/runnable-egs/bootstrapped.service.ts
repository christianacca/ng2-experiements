import { Injectable } from '@angular/core';
import { Startable } from '../runnable';
import { delay, Deferrable, ResolveDeferred } from '../promise-exts';

export abstract class BootstrappedService {
  asyncValue: string;
}

/**
 * Use a subclass to define hide the grimmy details of making BootstrappedService ready to
 * used in a synchronus fashion
 */
@Injectable()
@Deferrable<Startable>('startDone')
export class BootstrappedServiceImpl extends BootstrappedService implements Startable {
  startDone: Promise<void>;

  @ResolveDeferred()
  async start() {
    console.log('runnable-egs>BootstrappedService.run started');
    await delay(10);
    this.asyncValue = 'A value from BootstrappedService';
    console.log('runnable-egs>BootstrappedService.run resolved');
  }

  constructor() {
    super();
    console.log('runnable-egs>BootstrappedService.ctor');
  }
}

export const bootstrappedProviders = [
  { provide: BootstrappedService, useClass: BootstrappedServiceImpl }
];
