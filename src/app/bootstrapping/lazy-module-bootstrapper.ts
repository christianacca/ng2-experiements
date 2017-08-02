import { Injectable, Optional, Inject, SkipSelf, ErrorHandler } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Startable } from './startable';
import { Boostrapper, BOOTSTRAPPABLE, createConfigAndRunBlock } from './bootstrapper';

@Injectable()
export class LazyModuleBootstrapper implements CanActivate {

    private done: Promise<boolean>;

    constructor(
        @Inject(BOOTSTRAPPABLE) @Optional() private bootstrappable: Startable[],
        @SkipSelf() @Optional() private bootstrapper: Boostrapper
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        // Allow the first call to `run` to propogate any errors so that
        // angular will log the problem.
        // Thereafter, just deny the navigation by returning false
        // In this way we avoid the same cached error being notified multiple
        // times by the ErrorHandler service.
        // Of course, it does assume that the dev will now disable the
        // navigation thus giving the user a visual cue that the app is in a
        // faulty state

        if (this.done) {
            return this.done.catch(() => false);
        }
        return this.run();
    }

    run() {
        // only invoke runnables if we're running in a lazy loaded module
        if (!this.bootstrapper) {
            return Promise.resolve(true);
        }

        this.done = createConfigAndRunBlock(this.bootstrappable, this.bootstrapper)()
            .then(() => true)
        return this.done;
    }
}
