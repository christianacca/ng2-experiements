import { Injectable, APP_INITIALIZER } from '@angular/core';
import { BootstrappableBase } from './bootstrappable';
import { runBlockFactory } from './provide-bootstrappable';

@Injectable()
export class Bootstrappable2 extends BootstrappableBase {
    asyncValue: string;
    constructor() {
        super('Bootstrappable2Service');
    }
    protected bootstrapImpl() {
        return new Promise(resolve => {
            setTimeout(() => {
                this.asyncValue = 'A value from Bootstrappable2Service';
                resolve();
            }, 100);
        })
    }
}

// todo: replace provider with commented out lines once issue https://github.com/angular/angular/issues/13614 is resolved
export const bootstrappableProvider2 = [{
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: runBlockFactory,
        deps: [Bootstrappable2]
    }, Bootstrappable2];
// export const bootstrappableProvider2 = provideBootstrappable(Bootstrappable2);

