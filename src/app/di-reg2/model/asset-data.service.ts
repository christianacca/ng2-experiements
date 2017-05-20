import { Asset } from './asset';

export abstract class AssetDataService {
    abstract fetchFor(query: any): Promise<Asset[]>
    abstract fetchTotalAssetValue(): Promise<number>
}
