import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtensionEgsRoutingModule } from './extension-egs-routing.module';
import { BaseComponent } from './inheritance/base.component';
import { ChildComponent } from './inheritance/child.component';

@NgModule({
  imports: [
    CommonModule,
    ExtensionEgsRoutingModule
  ],
  declarations: [BaseComponent, ChildComponent]
})
export class ExtensionEgsModule { }
