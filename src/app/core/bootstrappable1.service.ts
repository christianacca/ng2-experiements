import { Injectable, APP_INITIALIZER } from '@angular/core';
import { Bootstrappable2 } from './bootstrappable2.service';
import { runBlockFactory } from './provide-bootstrappable';
import { Bootstrappable } from './bootstrappable';
import { delay, Deferrable, ResolveDeferred } from '../promise-exts';


@Injectable()
export class Bootstrappable1 extends Bootstrappable {
    asyncValue: string;
    done: Promise<void>;
    constructor(private bootstrappable2: Bootstrappable2) {
        super()
        console.log(`Bootstrappable.ctor -> recevied bootstrappable2`);
        console.log(`Bootstrappable.ctor -> bootstrappable2.asyncValue: ${bootstrappable2.asyncValue}`);
    }

    async bootstrap() {
        await this.bootstrappable2.done;
        await this.loadAsyncValue();
    }

    private async loadAsyncValue() {
        await delay(100);
        console.log(`Bootstrappable.loadAsyncValue -> bootstrappable2.asyncValue: ${this.bootstrappable2.asyncValue}`);
        this.asyncValue = this.bootstrappable2.asyncValue;
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

