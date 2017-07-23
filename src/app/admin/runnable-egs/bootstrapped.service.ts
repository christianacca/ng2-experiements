import { Injectable } from '@angular/core';
import { Startable } from '../../runnable';
import { delay } from '../../promise-exts';

export abstract class BootstrappedService {
  asyncValue: string;
}

/**
 * Use a subclass to define hide the grimmy details of making BootstrappedService ready to
 * used in a synchronus fashion
 */
@Injectable()
export class BootstrappedServiceImpl extends Startable implements BootstrappedService {
  asyncValue: string;
  async start() {
    console.log('admin>runnable-egs>BootstrappedService.run started');
    await delay(10);
    this.asyncValue = 'A value from admin>BootstrappedService';
    console.log('admin>runnable-egs>BootstrappedService.run resolved');
  }

  constructor() {
    super();
    console.log('admin>runnable-egs>BootstrappedService.ctor');
  }
}

export const bootstrappedProvider = [
  { provide: BootstrappedService, useClass: BootstrappedServiceImpl }
];
