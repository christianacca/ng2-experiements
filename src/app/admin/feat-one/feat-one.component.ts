import { Component, OnInit } from '@angular/core';

import { Asset, AssetType } from '../../core';

@Component({
  selector: 'app-feat-one',
  templateUrl: './feat-one.component.html'
})
export class FeatOneComponent implements OnInit {
  asset: Asset;
  constructor(Asset: AssetType) {
    this.asset = new Asset();
   }

  ngOnInit() {
    this.asset.load();
  }
}
