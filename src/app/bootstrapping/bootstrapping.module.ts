import { NgModule, Provider, ModuleWithProviders } from '@angular/core';
import { runnerProviders } from './bootstrapper';
import { LazyModuleBootstrapper } from './lazy-module-bootstrapper';

// note: these services WILL be registered with angular multiple times - once *per importing module*
// however, that's not a problem as angular will discard previous registrations run within the same main or lazy
// route. The end result will then be the desired one:
// one *instance* of each service for each injector servicing the main and lazy loaded route(s)
const perMainAndLazyRouteProviders = [LazyModuleBootstrapper, runnerProviders];

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
}
