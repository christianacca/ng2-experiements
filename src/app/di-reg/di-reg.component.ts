import { Component, OnInit } from '@angular/core';
import { Asset, AssetDataService } from './model';
import { assetDataServiceProviders } from './data';

@Component({
  template: `
    <p>
      di-reg Works!
    </p>
    <div>
      <button type="button" (click)="addEvent()">New Asset Event</button>
    </div>
    <div>
      <p>Reference: {{ asset.reference}}</p>
      <p>Title: {{asset.title}}</p>
    </div>
    <h3>Events:</h3>
    <ul>
      <li *ngFor="let e of asset.events">
        {{ e.reference }} - {{ e.title}}
      </li>
    </ul>
  `,
  providers: [assetDataServiceProviders]
})
export class DiRegComponent implements OnInit {
  asset: Asset;
  constructor(public assetDs: AssetDataService) { }

  addEvent() {

  }

  async ngOnInit() {
    const assets = await this.assetDs.fetchFor({});
    this.asset = assets[0];
  }
}
