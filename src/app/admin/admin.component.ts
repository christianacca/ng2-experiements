import { Component, OnInit, Inject, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asset, AssetType, Company, CompanyType } from '../shared';
import { BootstrappedService } from './runnable-egs/bootstrapped.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  asset: Asset;
  company: Company;
  title = 'Admin area';
  constructor(
    @Inject(AssetType) Asset: Type<Asset>,
    @Inject(CompanyType) Company: Type<Company>,
    bootstrapped: BootstrappedService,
    private route: ActivatedRoute
  ) {
    this.asset = new Asset();
    this.company = new Company();
    this.title = route.snapshot.data['title'] || this.title;
    console.log('AdminComponent created');
    console.log(`${bootstrapped.asyncValue}`);
  }

  ngOnInit() {
    this.asset.load();
    this.company.load();
  }
}
