import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as NgFormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormsRoutingModule } from './forms-routing.module';
import { FormEgComponent } from './form-eg/form-eg.component';
import { ModuleSyncInitModule } from '../../module-sync-init';
import { logModInitProvider } from './log-mod-init';
import { FormHybridComponent } from './form-hybrid/form-hybrid.component';
import { FormHybridComplexComponent } from './form-hybrid-complex/form-hybrid-complex.component';

@NgModule({
  imports: [
    CommonModule,
    FormsRoutingModule,
    NgFormsModule,
    ReactiveFormsModule,
    ModuleSyncInitModule.withInits([logModInitProvider])
  ],
  declarations: [
    FormEgComponent,
    FormHybridComponent,
    FormHybridComplexComponent
  ]
})
export class FormsModule { }
