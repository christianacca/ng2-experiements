import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routes';
import { BrowserModule } from '@angular/platform-browser';
import { DiComponent } from './di/di.component';
import { DiDir1Directive } from './di/di-dir1.directive';
import { DiDir2Directive } from './di/di-dir2.directive';
import { DiDir3Directive } from './di/di-dir3.directive';
import { DiDir5Directive } from './di/di-dir5.directive';
import { DiSub1Component } from './di/di-sub1/di-sub1.component';
import { DiSub2Component } from './di/di-sub2/di-sub2.component';
import { DiSub3Component } from './di/di-sub3/di-sub3.component';
import { DirLifecycleComponent } from './dir-lifecycle/dir-lifecycle.component';
import { FormEgComponent } from './form-eg/form-eg.component';
import { FormHybridComplexComponent } from './form-hybrid-complex/form-hybrid-complex.component';
import { FormHybridComponent } from './form-hybrid/form-hybrid.component';
import { HttpModule } from '@angular/http';
import { LogResultsComponent } from './dir-lifecycle/log-results/log-results.component';
import { NgModule } from '@angular/core';
import { ProjContainerComponent } from './dir-lifecycle/proj-container/proj-container.component';
import { ProjTmplContainerComponent } from './dir-lifecycle/proj-container/proj-tmpl-container.component';
import { ProjectedComponent } from './dir-lifecycle/projected/projected.component';
import { ReportsModule } from './reports/reports.module';
import { SharedModule } from './shared';
import { ThrowingChildComponent } from './zones/throwing-child/throwing-child.component';
import { ZonesComponent } from './zones/zones.component';
import { DiTmplContainerComponent } from './di/di-tmpl-container/di-tmpl-container.component';
import { DiDirTmplContainerDirective } from './di/di-dir-tmpl-container.directive';
import { DiTmplContainer2Component } from './di/di-tmpl-container2/di-tmpl-container2.component';
import { DiTmplContentDirective } from './di/di-tmpl-container2/di-tmpl-content.directive';

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
    DiDir5Directive,
    DirLifecycleComponent,
    ProjContainerComponent,
    ProjTmplContainerComponent,
    ProjectedComponent,
    LogResultsComponent,
    DiTmplContainerComponent,
    DiDirTmplContainerDirective,
    DiTmplContainer2Component,
    DiTmplContentDirective
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
