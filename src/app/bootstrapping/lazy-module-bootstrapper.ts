import { Injectable, Optional, Inject, SkipSelf, ErrorHandler } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Startable } from './startable';
import { Boostrapper, BOOTSTRAPPABLE, createConfigAndRunBlock } from './bootstrapper';

@Injectable()
export class LazyModuleBootstrapper implements CanActivate {

    private blockingDone: Promise<boolean>;

    constructor(
        @Inject(BOOTSTRAPPABLE) @Optional() private bootstrappable: Startable[],
        @SkipSelf() @Optional() private bootstrapper: Boostrapper,
        private errorHandler: ErrorHandler
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.blockingDone || this.run();
    }

    run() {
        // only invoke runnables if we're running in a lazy loaded module
        if (!this.bootstrapper) {
            return Promise.resolve(true);
        }

        // Q: why are we manually sending errors to `ErrorHandler.handleError`?
        //    Given that angular would do that for us so long as we let the promise
        //    rejection go "unhandled" (ie when no catch callback is registered with
        //    the promise)
        // A: angular would indeed send the error to `ErrorHandler.handleError` for us
        //    However, it would keep sending the same promise rejection error every
        //    time the user attempted to navigate.
        //    Whereas we only want the error to be sent once and thereafter, just
        //    deny the navigation by returning false

        // Of course, returning false, whilst stopping navigation, it does assume that
        // the dev will also disable the navigation action thus giving the user a visual
        // cue that the app is in a faulty state

        // note: not all boostrapping work will be blocking
        // it's the dev's responsibility to prevent the menu items for a lazy
        // loaded module that is faulting from being activated, not this service
        // all this service is responsible for is for preventing the route from
        // activating in case a blocking bootstrap fails
        this.blockingDone = createConfigAndRunBlock(this.bootstrappable, this.bootstrapper)()
            .then(() => true)
            .catch(error => {
                this.errorHandler.handleError(error);
                return false;
            });
        return this.blockingDone;
    }
}
