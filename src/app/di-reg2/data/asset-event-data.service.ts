import { Injectable, Provider } from '@angular/core';
import { AssetEvent, AssetEventDataService } from '../model';
import { QueryCommand, DB_SERVICE } from '../db';

@Injectable()
export class AssetEventDataServiceImpl implements AssetEventDataService {
    constructor(private queryCmd: QueryCommand) {
        console.log('di-reg2>AssetEventDataServiceImpl.ctor');
    }
    create(initialData: Partial<AssetEvent>): Promise<AssetEvent> {
        return Promise.resolve(Object.assign(new AssetEvent(), initialData));
    }

    fetchFor(query: any): Promise<AssetEvent[]> {
        return this.queryCmd.run<AssetEvent>();
    }
}

export const assetEventDataServiceProviders: Provider[] = [
    { provide: DB_SERVICE, multi: true, useValue: { provide: AssetEventDataService, useClass: AssetEventDataServiceImpl } }
];
