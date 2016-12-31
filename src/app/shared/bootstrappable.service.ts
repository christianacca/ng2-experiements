import { Injectable, APP_INITIALIZER } from '@angular/core';
import { BootstrappableBase } from './bootstrappable';
import { Bootstrappable2 } from './bootstrappable2.service';

@Injectable()
export class Bootstrappable extends BootstrappableBase {
    value: string;
    constructor(private bootstrappable2: Bootstrappable2) {
        super('BootstrappableService');
        console.log(`Bootstrappable.ctor -> recevied bootstrappable2`);
        console.log(`Bootstrappable.ctor -> bootstrappable2.asyncValue: ${bootstrappable2.asyncValue}`);
    }
    protected bootstrapImpl() {
        return this.bootstrappable2.done.then(() => this.loadAsyncValue());
    }
    private loadAsyncValue() {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`Bootstrappable.loadAsyncValue -> bootstrappable2.asyncValue: ${this.bootstrappable2.asyncValue}`);
                this.value = this.bootstrappable2.asyncValue;
                resolve();
            }, 100);
        });
    }
}


