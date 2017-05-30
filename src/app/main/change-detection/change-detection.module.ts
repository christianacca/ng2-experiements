import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeDetectionRoutingModule } from './change-detection-routing.module';
import { CounterContainerComponent } from './detatched-obs/counter-container.component';
import { CounterComponent } from './detatched-obs/counter.component';
import { CounterContainerComponent as ImmutableCounterContainerComp } from './detatched-immutable/counter-container.component';
import { CounterComponent as ImmutableCounterComp } from './detatched-immutable/counter.component';
import { SharedModule } from '../../shared/shared.module';
import { DetatchedClicksComponent } from './detatched-clicks/detatched-clicks.component';
import { ClickableComponent } from './detatched-clicks/clickable.component';

@NgModule({
  imports: [
    CommonModule,
    ChangeDetectionRoutingModule,
    SharedModule
  ],
  declarations: [
    CounterContainerComponent, CounterComponent,
    ImmutableCounterContainerComp, ImmutableCounterComp, DetatchedClicksComponent, ClickableComponent
  ]
})
export class ChangeDetectionModule { }
