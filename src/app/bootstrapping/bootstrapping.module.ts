import { NgModule, Provider, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { bootstrapperProviders, Boostrapper } from './bootstrapper';
import { LazyModuleBootstrapper } from './lazy-module-bootstrapper';

// note: these services WILL be registered with angular multiple times - once *per importing module*
// however, that's not a problem as angular will discard previous registrations run within the same main or lazy
// route. The end result will then be the desired one:
// one *instance* of each service for each injector servicing the main and lazy loaded route(s)
const perMainAndLazyRouteProviders = [LazyModuleBootstrapper, bootstrapperProviders];

@NgModule({})
export class BootstrappingModule {
    static for(runnableProviders: Provider[]): ModuleWithProviders {

        // note: `for` method is purely syntax sugar
        // it's purpose is to encourage consumers to group *together* the list of
        // providers that will run at the start of an application / module, and thus
        // promote thinking about the *order* in which these providers will run

        return {
            ngModule: BootstrappingModule,
            providers: [
                perMainAndLazyRouteProviders,
                runnableProviders
            ]
        };
    }
    constructor(bootstrapper: LazyModuleBootstrapper, errorHandler: ErrorHandler) {
        // kick off bootstrapping for a lazy loaded module as soon as it's loaded
        // that way when the route is navigated to, any blocking bootstrapping
        // work will have already completed

        // Q: why are we manually publishing via `handleError`, promise rejected errors
        //    returned by `bootstrapper.run`?
        //    Given that angular ordinarily does this for us when it sees that an error from a
        //    promise is going unhandled (ie no catch callback registered with the promise)
        // A: on testing when our `BootstrappingModule.ctor` is being invoked during lazy loading
        //    of a route then angular will NOT pass the error that is about to be swallowed through
        //    to ErrorHandler. Therefore we need to always do this ourselves even though this
        //    would sometimes be redundant.
        bootstrapper.run().catch(error => {
            errorHandler.handleError(error);
        });
    }
}
