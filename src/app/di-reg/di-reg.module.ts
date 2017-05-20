import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiRegComponent } from './di-reg.component';
import { DiRegRoutingModule } from './di-reg-routing.module';
import { AssetListComponent } from './asset-list/asset-list.component';
import { DbModule } from './db';

@NgModule({
  imports: [
    CommonModule,
    DiRegRoutingModule,
    DbModule
  ],
  declarations: [DiRegComponent, AssetListComponent]
})
export class DiRegModule { }
