import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CoreModule } from './core';
import { RunnableModule, RUNNABLE } from './runnable';
import { OnRun } from './runnable-egs/on-run.service';
import { bootstrappedProviders, BootstrappedService } from './runnable-egs/bootstrapped.service';
import { ModuleSyncInitModule } from './module-sync-init';
import { logModInitProvider } from './log-mod-init';
import { RoutingEgsModule } from './routing-egs/routing-egs.module';
import { DebugRouteReuseStrategy } from './core/debug-route-reuse-strategy';
import { DiRegModule } from './di-reg/di-reg.module';
import { DiReg2Module } from './di-reg2/di-reg2.module';
// import { RouteAlwaysReuseStrategy } from './core/route-reuse-always-strategy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    ModuleSyncInitModule.withInits([logModInitProvider]),
    AppRoutingModule,
    RoutingEgsModule,
    DiRegModule,
    DiReg2Module,
    RunnableModule.for([
      { provide: RUNNABLE, multi: true, useClass: OnRun },
      { provide: RUNNABLE, multi: true, useExisting: BootstrappedService }
    ])
  ],
  providers: [
    bootstrappedProviders,
    { provide: RouteReuseStrategy, useClass: DebugRouteReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
