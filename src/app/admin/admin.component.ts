import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asset, AssetType, Company, CompanyType } from '../shared';

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
    @Inject(AssetType) Asset: AssetType,
    @Inject(CompanyType) Company: CompanyType,
    private route: ActivatedRoute
  ) {
    this.asset = new Asset();
    this.company = new Company();
    this.title = route.snapshot.data['title'] || this.title;
  }

  ngOnInit() {
    this.asset.load();
    this.company.load();
  }
}
