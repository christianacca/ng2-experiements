import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildRoute1Component } from './child-route1.component';
import { ChildRoute2Component } from './child-route2.component';
import { RoutingEgComponent } from './routing-eg.component';
import { ResolveEg } from './resolve';
import { SiblingChildComponent } from './sibling-child.component';

const routes: Routes = [
  {
    path: 'routing-eg',
    component: RoutingEgComponent,
    resolve: {
      eg: ResolveEg
    },
    children: [
      { path: 'child-route1', component: ChildRoute1Component },
      { path: 'child-route2/:mandatory1', component: ChildRoute2Component },
      { path: 'sibling-child', component: SiblingChildComponent, outlet: 'aux' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingEgsRoutingModule { }
