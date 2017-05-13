import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiRegComponent } from './di-reg.component';

const routes: Routes = [
  {
    path: 'di-reg',
    component: DiRegComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiRegRoutingModule { }
