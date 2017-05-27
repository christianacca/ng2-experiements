import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeDetectionRoutingModule } from './change-detection-routing.module';
import { CounterContainerComponent } from './detatched-obs/counter-container.component';
import { CounterComponent } from './detatched-obs/counter.component';

@NgModule({
  imports: [
    CommonModule,
    ChangeDetectionRoutingModule
  ],
  declarations: [CounterContainerComponent, CounterComponent]
})
export class ChangeDetectionModule { }
