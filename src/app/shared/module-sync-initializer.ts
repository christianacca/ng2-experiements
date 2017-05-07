import { InjectionToken, Injectable, Inject, Optional } from '@angular/core';

/**
 * A function that will be executed when a module is initialized.
 */
export const MOD_SYNC_INIT = new InjectionToken<Array<() => void>>('ctorInit');

@Injectable()
export class ModuleSyncInitializer {
    constructor(@Inject(MOD_SYNC_INIT) @Optional() private modInits: Array<() => any>) {}

    run() {
        if (this.modInits != null) {
            this.modInits.forEach(f => f());
        }
    }
}
