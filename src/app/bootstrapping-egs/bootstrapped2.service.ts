import { Injectable } from '@angular/core';
import { Startable, BOOTSTRAPPABLE } from '../bootstrapping';
import { delay, Deferrable, ResolveDeferred } from '../promise-exts';
import { BootstrappedService } from './bootstrapped.service';

export abstract class Bootstrapped2Service {
  asyncValue: string;
}

/**
 * Example use of a subclass to define hide the grimmy details of making Bootstrapped2Service ready to
 * used in a synchronus fashion
 */
@Injectable()
@Deferrable<Startable>('startDone')
export class Bootstrapped2ServiceImpl extends Bootstrapped2Service implements Startable {
  startDone: Promise<void>;

  constructor(private bootstrapped: BootstrappedService) {
    super();
    console.log(`runnable-egs>Bootstrapped2Service.ctor -> recevied bootstrapped`);
    console.log(`runnable-egs>Bootstrapped2Service.ctor -> bootstrapped.asyncValue: ${bootstrapped.asyncValue}`);
  }

  @ResolveDeferred()
  async start() {
    await this.bootstrapped.startDone;
    console.log(`runnable-egs>Bootstrapped2Service.start -> bootstrapped.asyncValue: ${this.bootstrapped.asyncValue}`);
    await delay(100);
    this.asyncValue = this.bootstrapped.asyncValue;
  }
}

export const bootstrapped2Providers = [
  { provide: Bootstrapped2Service, useClass: Bootstrapped2ServiceImpl },
  { provide: BOOTSTRAPPABLE, multi: true, useExisting: Bootstrapped2Service }
];
