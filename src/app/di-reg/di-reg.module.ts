import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiRegComponent } from './di-reg.component';
import { DiRegRoutingModule } from './di-reg-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DiRegRoutingModule
  ],
  declarations: [DiRegComponent]
})
export class DiRegModule { }
