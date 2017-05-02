/*
 * Example of defining a constructor, where the *constructor* itself that can be
 * injected as a service.
 *
 * See also company.ts for an alternative (better) implementation
 *
 * See also report.model.ts for an alternative *design* where instances
 * of the constructor depends on services provided by the injector
 * but where the *constructor* is loaded as a regualr ES2015 module
 * and is NOT injected as a service.
 *
 * Why?
 * This is useful when your program wants a plain constructor to create
 * instances but those instances must rely on service created by the
 * angular injector
 */

import { InjectionToken, Type } from '@angular/core';
import { Db } from './db.service';

export interface Asset {
    id?: number;
    purchaseValue?: number;
    load(): Promise<void>;
}

export const AssetType = new InjectionToken<Type<Asset>>('AssetType');

export function assetCtorFactory(db: Db) {
    return class implements Asset {
        id?: number;
        purchaseValue?: number;
        load() {
           return db.fetchEntityData<Asset>(this.id, 'Asset').then(data => {
                this.purchaseValue = data.purchaseValue || 0;
           });
        }
    };
}

export let ASSET_TYPE_PROVIDER = {
    provide: AssetType,
    useFactory: assetCtorFactory,
    deps: [Db]
};
