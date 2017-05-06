import { InjectionToken, Injectable, Inject, Optional } from '@angular/core';

/**
 * A function that will be executed when a module is initialized.
 */
export const MOD_INITIALIZER = new InjectionToken<Array<() => void>>('ctorInit');

@Injectable()
export class ModuleInitializer {
    constructor(@Inject(MOD_INITIALIZER) @Optional() private modInits: Array<() => any>) {}

    run() {
        if (this.modInits != null) {
            this.modInits.forEach(f => f());
        }
    }
}
