import { Injectable, Optional, Inject, SkipSelf } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AsyncRunner, Configurable, Runnable, STARTABLE, createConfigAndRunBlock } from './runner';

@Injectable()
export class LazyModuleRunner implements CanActivate {

    private donePromise: Promise<boolean>;
    private _done = false;
    constructor(
        @Inject(STARTABLE) @Optional() private runnables: Runnable[],
        @SkipSelf() @Optional() private runner: AsyncRunner) {
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
