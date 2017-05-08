import { NgModule, ErrorHandler } from '@angular/core';

import { COMPANY_TYPE_PROVIDER } from './company';
import { ASSET_TYPE_PROVIDER } from './asset';
import { bootstrappableProvider } from './bootstrappable1.service';
import { bootstrappableProvider2 } from './bootstrappable2.service';
import { Db } from './db.service';
import { DelegatingErrorHandler } from './delegating-error-handler.service';

@NgModule({
  providers: [
    COMPANY_TYPE_PROVIDER,
    ASSET_TYPE_PROVIDER,
    bootstrappableProvider,
    bootstrappableProvider2,
    Db,
    { provide: ErrorHandler, useClass: DelegatingErrorHandler }
  ]
})
export class SharedModule {}
