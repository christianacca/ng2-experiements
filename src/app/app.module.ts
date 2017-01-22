import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { AppRoutingModule } from './app-routes';
import { ReportsModule } from './reports/reports.module';
import { FormEgComponent } from './form-eg/form-eg.component';
import { FormHybridComponent } from './form-hybrid/form-hybrid.component';
import { ZonesComponent } from './zones/zones.component';
import { ThrowingChildComponent } from './zones/throwing-child/throwing-child.component';
import { FormHybridComplexComponent } from './form-hybrid-complex/form-hybrid-complex.component';
import { DiComponent } from './di/di.component';
import { DiDir1Directive } from './di/di-dir1.directive';
import { DiDir2Directive } from './di/di-dir2.directive';
import { DiSub1Component } from './di/di-sub1/di-sub1.component';
import { DiDir3Directive } from './di/di-dir3.directive';
import { DiSub2Component } from './di/di-sub2/di-sub2.component';
import { DiSub3Component } from './di/di-sub3/di-sub3.component';
import { DiDir5Directive } from './di/di-dir5.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormEgComponent,
    FormHybridComponent,
    ZonesComponent,
    ThrowingChildComponent,
    FormHybridComplexComponent,
    DiComponent,
    DiDir1Directive,
    DiDir2Directive,
    DiSub1Component,
    DiDir3Directive,
    DiSub2Component,
    DiSub3Component,
    DiDir5Directive
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AdminModule,
    ReportsModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
