import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOD_SYNC_INIT, ModuleSyncInitModule } from '../../module-sync-init';
import { FormEgComponent } from './form-eg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { logModInitProvider } from './log-mod-init';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModuleSyncInitModule.withInits([logModInitProvider])
  ],
  declarations: [
    FormEgComponent
  ]
})
export class FormEgModule {
  constructor() {
    console.log('FormEgModule.ctor');
  }
}
