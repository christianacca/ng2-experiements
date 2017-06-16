import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildComponent } from './inheritance/child.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'basic-inheritance', component: ChildComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtensionEgsRoutingModule { }
