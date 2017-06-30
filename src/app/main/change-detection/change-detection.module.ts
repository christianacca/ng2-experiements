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
import { EventGrandparentComponent } from './object-with-events/event-grandparent.component';
import { EventParentComponent } from './object-with-events/event-parent.component';
import { EventChildComponent } from './object-with-events/event-child.component';
import { ZoneCdComponent } from './zone-cd/zone-cd.component';
import { PushParentComponent } from './on-push-children/push-parent.component';
import { PushChildComponent } from './on-push-children/push-child.component';
import { PushGrandchildComponent } from './on-push-children/push-grandchild.component';
import { KeyValueDifferComponent } from './differ/key-value-differ.component';

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
    GrandparentComponent, ParentComponent, ChildComponent,
    EventGrandparentComponent, EventParentComponent, EventChildComponent, ZoneCdComponent, PushParentComponent,
    PushChildComponent, PushGrandchildComponent, KeyValueDifferComponent
  ]
})
export class ChangeDetectionModule { }
