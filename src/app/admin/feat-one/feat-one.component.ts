import { Component, OnInit, Inject, Type } from '@angular/core';

import { Asset, AssetType } from '../../shared';

@Component({
  selector: 'app-feat-one',
  templateUrl: './feat-one.component.html'
})
export class FeatOneComponent implements OnInit {
  asset: Asset;
  constructor(@Inject(AssetType) Asset: Type<Asset>) {
    this.asset = new Asset();
   }

  ngOnInit() {
    this.asset.load();
  }
}
