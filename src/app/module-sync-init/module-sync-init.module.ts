import { NgModule, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleSyncInitializer } from './module-sync-initializer';

// note: these services WILL be registered with angular multiple times - once *per importing module*
// however, that's not a problem as angular will discard previous registrations run within the same main or lazy
// route. The end result will then be the desired one:
// one *instance* of each service for each injector servicing the main and lazy loaded route(s)
const perMainAndLazyRouteProviders = [ModuleSyncInitializer];

@NgModule({})
export class ModuleSyncInitModule {
  static withInits(initProviders: Provider[]): ModuleWithProviders {
    return {
      ngModule: ModuleSyncInitModule,
      providers: [perMainAndLazyRouteProviders, ...initProviders]
    };
  }

  constructor(initializer: ModuleSyncInitializer) {
    // note: a module is instantiated:
    // 1. *once* for the non-lazy route when imported by at least one module within that non-lazy route
    // 2. *once* per lazy loaded route when imported by at least one module within that lazy loaded route
    console.log('ModuleSyncInitModule.ctor');
    initializer.run();
  }
}
