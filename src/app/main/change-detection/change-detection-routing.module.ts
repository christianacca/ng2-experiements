import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterContainerComponent } from './detatched-obs/counter-container.component';
import { CounterContainerComponent as ImmutableCounterContainerComp } from './detatched-immutable/counter-container.component';
import { DetatchedClicksComponent } from './detatched-clicks/detatched-clicks.component';
import { GrandparentComponent } from './unidir-problem/grandparent.component';
import { EventGrandparentComponent } from './object-with-events/event-grandparent.component';
import { ZoneCdComponent } from './zone-cd/zone-cd.component';
import { PushParentComponent } from './on-push-children/push-parent.component';

const routes: Routes = [
  { path: 'detatched-obs', component: CounterContainerComponent },
  { path: 'detatched-immutable', component: ImmutableCounterContainerComp },
  { path: 'detatched-clicks', component: DetatchedClicksComponent },
  { path: 'unidir-problem', component: GrandparentComponent },
  { path: 'object-with-events', component: EventGrandparentComponent },
  { path: 'zone-cd', component: ZoneCdComponent },
  { path: 'on-push-children', component: PushParentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeDetectionRoutingModule { }
