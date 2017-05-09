import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormEgComponent } from './form-eg/form-eg.component';
import { FormHybridComponent } from './form-hybrid/form-hybrid.component';
import { FormHybridComplexComponent } from './form-hybrid-complex/form-hybrid-complex.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        component: FormEgComponent,
        path: 'form-eg'
      },
      {
        component: FormHybridComponent,
        path: 'form-hybrid'
      },
      {
        component: FormHybridComplexComponent,
        path: 'form-hybrid-complex'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
