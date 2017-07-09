import { NgModule, ErrorHandler, InjectionToken } from '@angular/core';

import { COMPANY_TYPE_PROVIDER } from './company';
import { ASSET_TYPE_PROVIDER } from './asset';
import { bootstrappableProvider } from './bootstrappable1.service';
import { bootstrappableProvider2 } from './bootstrappable2.service';
import { Db } from './db.service';
import { TreeChangeDetectorRef } from './tree-change-detector-ref.service';
import { ErrorHandlingModule } from './error-handling';

@NgModule({
  imports: [
    ErrorHandlingModule.forRoot()
  ],
  providers: [
    COMPANY_TYPE_PROVIDER,
    ASSET_TYPE_PROVIDER,
    bootstrappableProvider,
    bootstrappableProvider2,
    Db,
    TreeChangeDetectorRef
  ]
})
export class CoreModule { }
