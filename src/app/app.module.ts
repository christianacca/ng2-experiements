import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

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
import { RoutingEgsModule } from './routing-egs/routing-egs.module';
import { DebugRouteReuseStrategy } from './shared/debug-route-reuse-strategy';
import { DiRegModule } from './di-reg/di-reg.module';
// import { RouteAlwaysReuseStrategy } from './shared/route-reuse-always-strategy';

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
    RoutingEgsModule,
    DiRegModule,
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
