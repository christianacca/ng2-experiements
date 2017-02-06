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


@NgModule({
    providers: [
        COMPANY_TYPE_PROVIDER,
        ASSET_TYPE_PROVIDER,
        provideBootstrappable(Bootstrappable),
        provideBootstrappable(Bootstrappable2),
        Db,
        { provide: ErrorHandler, useClass: DelegatingErrorHandler }
    ]
})
export class SharedModule {

}