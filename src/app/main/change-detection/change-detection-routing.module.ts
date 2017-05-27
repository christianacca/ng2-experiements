import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterContainerComponent } from './detatched-obs/counter-container.component';

const routes: Routes = [
  { path: 'detatched-obs', component: CounterContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeDetectionRoutingModule { }
