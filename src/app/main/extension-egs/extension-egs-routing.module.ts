import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildComponent } from './inheritance/child.component';
import { HostEgComponent } from './dir-composition/host-eg.component';
import { InheritingComponent } from './mixin-inheritance/inheriting.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'basic-inheritance', component: ChildComponent },
      { path: 'mixin-inheritance', component: InheritingComponent },
      { path: 'host-hook', component: HostEgComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtensionEgsRoutingModule { }
