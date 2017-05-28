import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterContainerComponent } from './detatched-obs/counter-container.component';
import { CounterContainerComponent as ImmutableCounterContainerComp } from './detatched-immutable/counter-container.component';

const routes: Routes = [
  { path: 'detatched-obs', component: CounterContainerComponent },
  { path: 'detatched-immutable', component: ImmutableCounterContainerComp }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeDetectionRoutingModule { }
