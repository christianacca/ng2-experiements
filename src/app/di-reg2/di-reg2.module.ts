import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiReg2Component } from './di-reg2.component';
import { DiReg2RoutingModule } from './di-reg2-routing.module';
import { DbModule } from './db';
import { AssetListComponent } from './asset-list/asset-list.component';
import { assetDataProviders } from './data';

@NgModule({
  imports: [
    CommonModule,
    DiReg2RoutingModule,
    DbModule
  ],
  declarations: [DiReg2Component, AssetListComponent],
  providers: [
    assetDataProviders
  ]
})
export class DiReg2Module { }
