import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingEgsRoutingModule } from './routing-egs-routing.module';
import { ChildRoute1Component } from './child-route1.component';
import { ChildRoute2Component } from './child-route2.component';
import { RoutingEgComponent } from './routing-eg.component';
import { RoutingLevelService } from './routing-level.service';
import { ResolveEg } from './resolve';
import { SiblingChildComponent } from './sibling-child.component';


@NgModule({
  imports: [
    CommonModule,
    RoutingEgsRoutingModule
  ],
  declarations: [ChildRoute1Component, ChildRoute2Component, RoutingEgComponent, SiblingChildComponent],
  providers: [
    RoutingLevelService,
    ResolveEg
  ]
})
export class RoutingEgsModule { }
