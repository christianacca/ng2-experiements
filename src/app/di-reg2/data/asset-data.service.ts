import { Injectable, Provider } from '@angular/core';
import { Asset, AssetDataService } from '../model';
import { QueryCommand, DataCacheService, DB_SERVICE } from '../db';

@Injectable()
export class AssetDataServiceImpl implements AssetDataService {
    constructor(private queryCmd: QueryCommand, private cache: DataCacheService) {
        console.log('di-reg2>AssetDataServiceImpl.ctor');
    }
    async fetchFor(query: any) {
        const rawResults = await this.queryCmd.run<Asset>();
        const results = rawResults.map(x => Object.assign(new Asset(), x));
        return results;
    }

    fetchTotalAssetValue(): Promise<number> {
        const result = this.cache.get('TotalAssetValue');
        if (result != null) {
            return result;
        }
        // fake a call to a slow server
        const fetched = new Promise<number>(resolve => {
            setTimeout(() => resolve(5980), 2000);
        });
        this.cache.set('TotalAssetValue', fetched);
        return fetched;
    }
}

export const assetDataServiceProviders: Provider[] = [
    { provide: DB_SERVICE, multi: true, useValue: { provide: AssetDataService, useClass: AssetDataServiceImpl } }
];
