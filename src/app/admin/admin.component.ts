import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asset, AssetType, Company, CompanyType } from '../core';
import { BootstrappedService } from './bootstrapping-egs/bootstrapped.service';

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
    // tslint:disable-next-line:no-shadowed-variable
    Asset: AssetType,
    // tslint:disable-next-line:no-shadowed-variable
    Company: CompanyType,
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
