import { NgModule } from '@angular/core';

import { provideBootstrappable } from './provide-bootstrappable';
import { Company, CompanyType, COMPANY_TYPE_PROVIDER } from './company';
import { Asset, AssetType, ASSET_TYPE_PROVIDER } from './asset';
import { Db } from './db.service';
import { Bootstrappable } from './bootstrappable.service';
import { Bootstrappable2 } from './bootstrappable2.service';

export { Company, CompanyType };
export { Asset, AssetType };
export { Bootstrappable, Bootstrappable2 };

@NgModule({
    providers: [
        COMPANY_TYPE_PROVIDER,
        ASSET_TYPE_PROVIDER,
        provideBootstrappable(Bootstrappable),
        provideBootstrappable(Bootstrappable2),
        Db
    ]
})
export class SharedModule {

}