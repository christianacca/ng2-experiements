import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CoreModule } from './core';
import { BootstrappingModule, BOOTSTRAPPABLE } from './bootstrapping';
import { OnStart } from './bootstrapping-egs/on-start.service';
import { bootstrappedProviders } from './bootstrapping-egs/bootstrapped.service';
import { bootstrapped2Providers } from './bootstrapping-egs/bootstrapped2.service';
import { ModuleSyncInitModule } from './module-sync-init';
import { logModInitProvider } from './log-mod-init';
import { RoutingEgsModule } from './routing-egs/routing-egs.module';
import { DebugRouteReuseStrategy } from './core/debug-route-reuse-strategy';
import { DiRegModule } from './di-reg/di-reg.module';
import { DiReg2Module } from './di-reg2/di-reg2.module';
import { TreeShakeModule } from './tree-shake/tree-shake.module';
import { errorModuleProviders } from './config/error-module-config';
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
    BootstrappingModule.for([
      errorModuleProviders,
      { provide: BOOTSTRAPPABLE, multi: true, useClass: OnStart },
      bootstrapped2Providers,
      bootstrappedProviders
    ]),
    TreeShakeModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: DebugRouteReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
