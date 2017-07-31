import { Injectable } from '@angular/core';
import { Startable, BOOTSTRAPPABLE, MixinStartable } from '../../bootstrapping';
import { delay, Deferrable, ResolveDeferred } from '../../promise-exts';
import { BootstrappedService } from './bootstrapped.service';

export abstract class Bootstrapped2Service {
  asyncValue: string;
}

/**
 * Example use of a subclass to define hide the grimmy details of making Bootstrapped2Service bootstrappable
 * See also: bootstrapping-egs/bootstrapped2.service for an alternative to using a mixin to define
 * inheritance as we're doing here
 */
// tslint:disable-next-line:class-name
export class _Bootstrapped2ServiceImpl extends Bootstrapped2Service {
  constructor(private bootstrapped: BootstrappedService) {
    super();
      console.log(`admin>runnable-egs>Bootstrapped2Service.ctor -> recevied bootstrapped`);
      console.log(`admin>runnable-egs>Bootstrapped2Service.ctor -> bootstrapped.asyncValue: ${bootstrapped.asyncValue}`);
  }

  async _doStart() {
    await this.bootstrapped.startDone;
    console.log(`admin>runnable-egs>Bootstrapped2Service.start -> bootstrapped.asyncValue: ${this.bootstrapped.asyncValue}`);
    await delay(100);
    this.asyncValue = this.bootstrapped.asyncValue;
  }
}

@Injectable()
export class Bootstrapped2ServiceImpl extends MixinStartable(_Bootstrapped2ServiceImpl) {
  constructor(bootstrapped: BootstrappedService) {
    super(bootstrapped);
  }
}

export const bootstrapped2Providers = [
  { provide: Bootstrapped2Service, useClass: Bootstrapped2ServiceImpl },
  { provide: BOOTSTRAPPABLE, multi: true, useExisting: Bootstrapped2Service }
];
