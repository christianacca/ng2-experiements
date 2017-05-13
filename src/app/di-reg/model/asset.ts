import { AssetEvent } from './asset-event';
import { AssetEventDataService } from './asset-event-data.service';

export class Asset {
    events: AssetEvent[] = [];
    reference: string;
    title: string;
    async addEvent(data: Partial<AssetEvent>, ds: AssetEventDataService) {
        const newEvent = await ds.create(data);
        this.events.push(newEvent);
    }
}
