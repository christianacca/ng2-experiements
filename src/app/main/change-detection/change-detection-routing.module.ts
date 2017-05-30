import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterContainerComponent } from './detatched-obs/counter-container.component';
import { CounterContainerComponent as ImmutableCounterContainerComp } from './detatched-immutable/counter-container.component';
import { DetatchedClicksComponent } from './detatched-clicks/detatched-clicks.component';

const routes: Routes = [
  { path: 'detatched-obs', component: CounterContainerComponent },
  { path: 'detatched-immutable', component: ImmutableCounterContainerComp },
  { path: 'detatched-clicks', component: DetatchedClicksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeDetectionRoutingModule { }
