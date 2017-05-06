import { NgModule, ModuleWithProviders, ErrorHandler, Inject, Optional } from '@angular/core';

import { COMPANY_TYPE_PROVIDER } from './company';
import { ASSET_TYPE_PROVIDER } from './asset';
import { bootstrappableProvider } from './bootstrappable.service';
import { bootstrappableProvider2 } from './bootstrappable2.service';
import { Db } from './db.service';
import { DelegatingErrorHandler } from './delegating-error-handler.service';
import { ModuleInitializer } from './module-initializer';

const perModuleServices = [ModuleInitializer];

@NgModule({})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        COMPANY_TYPE_PROVIDER,
        ASSET_TYPE_PROVIDER,
        bootstrappableProvider,
        bootstrappableProvider2,
        Db,
        { provide: ErrorHandler, useClass: DelegatingErrorHandler },
        perModuleServices
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [perModuleServices]
    };
  }

  constructor(moduleInitializer: ModuleInitializer) {
    moduleInitializer.run();
  }
}
