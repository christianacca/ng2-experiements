import { Injectable } from '@angular/core';
import { IRunnable } from '../runnable';
import { delay } from '../core';

export abstract class BootstrappedService {
  asyncValue: string;
}

/**
 * Use a subclass to define hide the grimmy details of making BootstrappedService ready to
 * used in a synchronus fashion
 */
@Injectable()
export class BootstrappedServiceImpl extends BootstrappedService implements IRunnable {

  async run() {
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
