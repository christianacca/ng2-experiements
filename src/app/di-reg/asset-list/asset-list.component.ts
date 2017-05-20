import { Component, OnInit } from '@angular/core';
import { Asset, AssetDataService, AssetEventDataService } from '../model';
import { assetDataProviders } from '../data';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  providers: [assetDataProviders],
  styles: [`
    :host { display: block }
  `]
})
export class AssetListComponent implements OnInit {
  selected: Asset;
  assets: Asset[];
  totalAssetValue: number;
  constructor(public assetDs: AssetDataService, private assetEventDs: AssetEventDataService) { }

  addEvent() {
    const evtData = { title: 'Event001', reference: 'Some event'};
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
