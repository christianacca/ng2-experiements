import { Injectable, Provider } from '@angular/core';
import { Asset, AssetDataService } from '../model';
import { QueryCommand, queryCommandProviders } from '../db';

@Injectable()
export class AssetDataServiceImpl implements AssetDataService {
    constructor(private queryCmd: QueryCommand) {

    }
    fetchFor(query: any): Promise<Asset[]> {
        return this.queryCmd.run<Asset>();
    }
}

export const assetDataServiceProviders: Provider[] = [
    {
        provide: AssetDataService, useClass: AssetDataServiceImpl,
    },
    queryCommandProviders
];
