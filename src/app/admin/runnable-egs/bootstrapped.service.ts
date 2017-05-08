import { Injectable } from '@angular/core';
import { IRunnable } from '../../runnable';

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
    console.log('admin>runnable-egs>BootstrappedService.run started');
    return new Promise(resolve => {
      setTimeout(() => {
        this.asyncValue = 'A value from admin>BootstrappedService';
        console.log('admin>runnable-egs>BootstrappedService.run resolved');
        resolve();
      }, 10);
    });
  }

  constructor() {
    super();
    console.log('admin>runnable-egs>BootstrappedService.ctor');
  }
}

export const bootstrappedProvider = [
  { provide: BootstrappedService, useClass: BootstrappedServiceImpl }
];
