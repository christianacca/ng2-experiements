import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiReg2Component } from './di-reg2.component';

const routes: Routes = [
  {
    path: 'di-reg2',
    component: DiReg2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiReg2RoutingModule { }
