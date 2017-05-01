import { ASSET_TYPE_PROVIDER, Asset, AssetType } from './asset';
import { COMPANY_TYPE_PROVIDER, Company, CompanyType } from './company';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';

import { Bootstrappable } from './bootstrappable.service';
import { Bootstrappable2 } from './bootstrappable2.service';
import { Db } from './db.service';
import { DelegatingErrorHandler } from './delegating-error-handler.service';
import { provideBootstrappable, runBlockFactory } from './provide-bootstrappable';

export { Company, CompanyType };
export { Asset, AssetType };
export { Bootstrappable, Bootstrappable2 };

// making an exported variable to try and solve issue: https://github.com/angular/angular/issues/13614 
// todo: replace provider with commented out lines once issue 13614 is resolved
export const bootstrappableProvider = [{
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: runBlockFactory,
        deps: [Bootstrappable]
    }, Bootstrappable];
export const bootstrappableProvider2 = [{
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: runBlockFactory,
        deps: [Bootstrappable2]
    }, Bootstrappable2];
/*
export const bootstrappableProvider = provideBootstrappable(Bootstrappable);
export const bootstrappableProvider2 = provideBootstrappable(Bootstrappable2);
*/
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