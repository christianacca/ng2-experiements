import { Provider } from '@angular/core';
import { AssetDataServiceImpl } from './asset-data.service';
import { AssetEventDataServiceImpl } from './asset-event-data.service';
import { AssetDataService, AssetEventDataService } from '../model';
import { dbProviders } from '../db';


// note: added `dbProviders` as a convenience so that component's do not have
//       to rememver to include these providers themselves

/**
 * Multi-instance providers
 *
 * * Register at the Component level to create service instances visible to only that component tree
 * * Register at the NgModule level to share service instances globally
 */
export const assetDataProviders: Provider[] = [
    dbProviders,
    { provide: AssetDataService, useClass: AssetDataServiceImpl },
    { provide: AssetEventDataService, useClass: AssetEventDataServiceImpl }
];
