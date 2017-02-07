import { ASSET_TYPE_PROVIDER, Asset, AssetType } from './asset';
import { COMPANY_TYPE_PROVIDER, Company, CompanyType } from './company';
import { ErrorHandler, NgModule } from '@angular/core';

import { Bootstrappable } from './bootstrappable.service';
import { Bootstrappable2 } from './bootstrappable2.service';
import { Db } from './db.service';
import { DelegatingErrorHandler } from './delegating-error-handler.service';
import { provideBootstrappable } from './provide-bootstrappable';

export { Company, CompanyType };
export { Asset, AssetType };
export { Bootstrappable, Bootstrappable2 };

// making an exported variable to try and solve issue: https://github.com/angular/angular/issues/13614 
export let bootstrappableProvider = provideBootstrappable(Bootstrappable);
export let bootstrappableProvider2 = provideBootstrappable(Bootstrappable2);
export let errorProvider = { provide: ErrorHandler, useClass: DelegatingErrorHandler };

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