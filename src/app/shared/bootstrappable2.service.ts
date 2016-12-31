import { Injectable, APP_INITIALIZER } from '@angular/core';
import { BootstrappableBase } from './bootstrappable';

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


