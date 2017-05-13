import { Injectable, Provider } from '@angular/core';
import { AssetEvent, AssetEventDataService } from '../model';
import { QueryCommand } from '../db';

@Injectable()
export class AssetEventDataServiceImpl implements AssetEventDataService {

    constructor(private queryCmd: QueryCommand) {

    }
    create(initialData: Partial<AssetEvent>): Promise<AssetEvent> {
        return Promise.resolve(Object.assign(new AssetEvent(), initialData));
    }

    fetchFor(query: any): Promise<AssetEvent[]> {
        return this.queryCmd.run<AssetEvent>();
    }
}

export const assetEventDataServiceProviders: Provider[] = [
    {
        provide: AssetEventDataService, useClass: AssetEventDataServiceImpl
    }
];
