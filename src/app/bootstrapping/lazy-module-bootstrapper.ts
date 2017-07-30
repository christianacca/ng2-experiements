import { Injectable, Optional, Inject, SkipSelf } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Startable } from './startable';
import { Boostrapper, BOOTSTRAPPABLE, createConfigAndRunBlock } from './bootstrapper';

@Injectable()
export class LazyModuleBootstrapper implements CanActivate {

    private donePromise: Promise<boolean>;
    private _done = false;
    constructor(
        @Inject(BOOTSTRAPPABLE) @Optional() private runnables: Startable[],
        @SkipSelf() @Optional() private runner: Boostrapper) {
        // only invoke runnables if we're running in a lazy loaded module
        if (!this.runner) {
            this.donePromise = Promise.resolve(true);
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.run();
    }

    run() {
        if (this.donePromise != null) { return this.donePromise; }

        this.donePromise = createConfigAndRunBlock(this.runnables, this.runner)()
            .then(() => {
                this._done = true;
                return this._done;
            });
        return this.donePromise;
    }
    get done(): boolean { return this._done; }
}