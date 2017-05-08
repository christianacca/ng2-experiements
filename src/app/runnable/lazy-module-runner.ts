import { Injectable, Optional, Inject, SkipSelf } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Runner, IRunnable, RUNNABLE } from './runner';

@Injectable()
export class LazyModuleRunner implements CanActivate {

    private donePromise: Promise<any>;
    private _done = false;
    constructor(
        @Inject(RUNNABLE) @Optional() private runnables: IRunnable[],
        @SkipSelf() @Optional() private runner: Runner) {
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

        this.donePromise = this.runner.run(this.runnables || []).then(() => {
            this._done = true;
            return this._done;
        });
        return this.donePromise;
    }
    get done(): boolean { return this._done; }
}
