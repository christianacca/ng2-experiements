import { ASSET_TYPE_PROVIDER, Asset, AssetType } from './asset';
import { COMPANY_TYPE_PROVIDER, Company, CompanyType } from './company';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';

import { Bootstrappable, bootstrappableProvider } from './bootstrappable.service';
import { Bootstrappable2, bootstrappableProvider2 } from './bootstrappable2.service';
import { Db } from './db.service';
import { DelegatingErrorHandler } from './delegating-error-handler.service';
import { provideBootstrappable, runBlockFactory } from './provide-bootstrappable';

export { Company, CompanyType };
export { Asset, AssetType };
export { Bootstrappable, Bootstrappable2, Db };
export { SYNC_INIT } from './sync-init-token';

export const errorProvider = { provide: ErrorHandler, useClass: DelegatingErrorHandler };

@NgModule({
    providers: [
        COMPANY_TYPE_PROVIDER,
        ASSET_TYPE_PROVIDER,
        bootstrappableProvider,
        bootstrappableProvider2,
        Db,
        errorProvider
    ]
})
export class SharedModule {

}
