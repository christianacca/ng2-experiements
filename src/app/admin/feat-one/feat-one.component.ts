import { Component, OnInit, Inject } from '@angular/core';

import { Asset, AssetType } from '../../shared';

@Component({
  selector: 'app-feat-one',
  templateUrl: './feat-one.component.html',
  styleUrls: ['./feat-one.component.css']
})
export class FeatOneComponent implements OnInit {
  asset: Asset;
  constructor(@Inject(AssetType) Asset: AssetType) {
    this.asset = new Asset();
   }

  ngOnInit() {
    this.asset.load();
  }
}
