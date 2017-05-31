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
import { GrandparentComponent } from './unidir-problem/grandparent.component';
import { ParentComponent } from './unidir-problem/parent.component';
import { ChildComponent } from './unidir-problem/child.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ChangeDetectionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CounterContainerComponent, CounterComponent,
    ImmutableCounterContainerComp, ImmutableCounterComp,
    DetatchedClicksComponent, ClickableComponent,
    GrandparentComponent, ParentComponent, ChildComponent
  ]
})
export class ChangeDetectionModule { }
