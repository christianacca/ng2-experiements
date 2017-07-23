import { Injectable, APP_INITIALIZER } from '@angular/core';
import { Bootstrappable } from './bootstrappable';
import { runBlockFactory } from './provide-bootstrappable';
import { delay, Deferrable, ResolveDeferred } from '../promise-exts';

@Injectable()
export class Bootstrappable2 extends Bootstrappable {
    asyncValue: string;
    async bootstrap() {
        await delay(100);
        this.asyncValue = 'A value from Bootstrappable2Service';
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

