import { Injectable } from '@angular/core';
import { IRunnable } from '../runnable';

export abstract class BootstrappedService {
  asyncValue: string;
}

/**
 * Use a subclass to define hide the grimmy details of making BootstrappedService ready to
 * used in a synchronus fashion
 */
@Injectable()
export class BootstrappedServiceImpl extends BootstrappedService implements IRunnable {

  run() {
    console.log('runnable-egs>BootstrappedService.run started');
    return new Promise(resolve => {
      setTimeout(() => {
        this.asyncValue = 'A value from BootstrappedService';
        console.log('runnable-egs>BootstrappedService.run resolved');
        resolve();
      }, 10);
    });
  }

  constructor() {
    super();
    console.log('runnable-egs>BootstrappedService.ctor');
  }
}

export const bootstrappedProviders = [
  { provide: BootstrappedService, useClass: BootstrappedServiceImpl }
];
