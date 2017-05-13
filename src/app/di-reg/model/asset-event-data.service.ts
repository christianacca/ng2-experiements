import { AssetEvent } from './asset-event';

export abstract class AssetEventDataService {
    abstract create(initialData: Partial<AssetEvent>): Promise<AssetEvent>;
    abstract fetchFor(query: any): Promise<AssetEvent[]>
}
