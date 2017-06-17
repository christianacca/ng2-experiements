import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtensionEgsRoutingModule } from './extension-egs-routing.module';
import { BaseComponent } from './inheritance/base.component';
import { ChildComponent } from './inheritance/child.component';
import { HostEgComponent } from './dir-composition/host-eg.component';
import { HostHookDirective } from './dir-composition/host-hook.directive';

@NgModule({
  imports: [
    CommonModule,
    ExtensionEgsRoutingModule
  ],
  declarations: [BaseComponent, ChildComponent, HostEgComponent, HostHookDirective]
})
export class ExtensionEgsModule { }
