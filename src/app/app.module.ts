import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared';
import { RunnableModule, RUNNABLE } from './runnable';
import { OnRun } from './runnable-egs/on-run.service';
import { bootstrappedProviders, BootstrappedService } from './runnable-egs/bootstrapped.service';
import { ModuleSyncInitModule } from './module-sync-init';
import { logModInitProvider } from './log-mod-init';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    ModuleSyncInitModule.withInits([logModInitProvider]),
    AppRoutingModule,
    RunnableModule.for([
      { provide: RUNNABLE, multi: true, useClass: OnRun },
      { provide: RUNNABLE, multi: true, useExisting: BootstrappedService }
    ])
  ],
  providers: [bootstrappedProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
