import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormHybridComponent } from './form-hybrid.component';
import { MOD_SYNC_INIT, ModuleSyncInitModule } from '../../module-sync-init';
import { logModInitProvider } from './log-mod-init';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModuleSyncInitModule.withInits([logModInitProvider])
  ],
  declarations: [
    FormHybridComponent
  ]
})
export class FormHybridModule {
  constructor() {
    console.log('FormHybridModule.ctor');
  }
}
