import { InjectionToken, Injectable, Inject, Optional } from '@angular/core';
import { Initializable } from './initializable';

type Init = (() => void) | Initializable;

/**
 * A initializer function or service that will be executed when a module is initialized.
 */
export const MOD_SYNC_INIT = new InjectionToken<Array<Init>>('Module Sync Functions');

@Injectable()
export class ModuleSyncInitializer {
    constructor( @Inject(MOD_SYNC_INIT) @Optional() private modInits: Array<Init>) { }

    run() {
        console.log('ModuleSyncInitializer.run');
        if (this.modInits == null) { return; }

        this.modInits.forEach(i => {
            if (Initializable.is(i)) {
                i.run();
            } else {
                i();
            }
        });
    }
}
