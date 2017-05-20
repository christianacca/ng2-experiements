import { Component, OnInit } from '@angular/core';
import { Asset, AssetDataService, AssetEventDataService } from '../model';
import { UowService, QueryCommand } from '../db';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styles: [`
    :host { display: block }
  `],
  providers: [UowService]
})
export class AssetListComponent implements OnInit {
  assetDs: AssetDataService;
  assetEventDs: AssetEventDataService;
  selected: Asset;
  assets: Asset[];
  totalAssetValue: number;
  constructor(uow: UowService) {
    this.assetDs = uow.get<AssetDataService>(AssetDataService);
    this.assetEventDs = uow.get<AssetEventDataService>(AssetEventDataService);
  }

  addEvent() {
    const evtData = { title: 'Event001', reference: 'Some event' };
    this.selected.addEvent(evtData, this.assetEventDs);
  }

  select(asset: Asset) {
    this.selected = asset;
  }

  async ngOnInit() {
    this.assets = await this.assetDs.fetchFor({});
    this.totalAssetValue = await this.assetDs.fetchTotalAssetValue();
  }
}
