import { DB_SERVICE } from '../db';
import { AssetDataService, AssetEventDataService } from '../model';
import { AssetDataServiceImpl } from '../data/asset-data.service';
import { AssetEventDataServiceImpl } from '../data/asset-event-data.service';

export const assetDataProviders = [
    { provide: DB_SERVICE, multi: true, useValue: { provide: AssetDataService, useClass: AssetDataServiceImpl } },
    { provide: DB_SERVICE, multi: true, useValue: { provide: AssetEventDataService, useClass: AssetEventDataServiceImpl } }
];
