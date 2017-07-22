import { Injectable, APP_INITIALIZER } from '@angular/core';
import { BootstrappableBase } from './bootstrappable';
import { Bootstrappable2 } from './bootstrappable2.service';
import { runBlockFactory } from './provide-bootstrappable';

@Injectable()
export class Bootstrappable1 extends BootstrappableBase {
    asyncValue: string;
    constructor(private bootstrappable2: Bootstrappable2) {
        super('BootstrappableService');
        console.log(`Bootstrappable.ctor -> recevied bootstrappable2`);
        console.log(`Bootstrappable.ctor -> bootstrappable2.asyncValue: ${bootstrappable2.asyncValue}`);
    }
    protected async bootstrapImpl() {
        await this.bootstrappable2.done;
        return this.loadAsyncValue();
    }
    private loadAsyncValue() {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                console.log(`Bootstrappable.loadAsyncValue -> bootstrappable2.asyncValue: ${this.bootstrappable2.asyncValue}`);
                this.asyncValue = this.bootstrappable2.asyncValue;
                resolve();
            }, 100);
        });
    }
}

// todo: replace provider with commented out lines once issue https://github.com/angular/angular/issues/13614 is resolved
export const bootstrappableProvider = [{
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: runBlockFactory,
        deps: [Bootstrappable1]
    }, Bootstrappable1];
// export const bootstrappableProvider = provideBootstrappable(Bootstrappable);

