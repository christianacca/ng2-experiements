import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DiComponent } from './di/di.component';
import { DiDir1Directive } from './di/di-dir1.directive';
import { DiDir2Directive } from './di/di-dir2.directive';
import { DiDir3Directive } from './di/di-dir3.directive';
import { DiDir5Directive } from './di/di-dir5.directive';
import { DiSub1Component } from './di/di-sub1/di-sub1.component';
import { DiSub2Component } from './di/di-sub2/di-sub2.component';
import { DiSub3Component } from './di/di-sub3/di-sub3.component';
import { DirLifecycleComponent } from './dir-lifecycle/dir-lifecycle.component';
import { LogResultsComponent } from './dir-lifecycle/log-results/log-results.component';
import { ProjContainerComponent } from './dir-lifecycle/proj-container/proj-container.component';
import { ProjTmplContainerComponent } from './dir-lifecycle/proj-container/proj-tmpl-container.component';
import { ProjectedComponent } from './dir-lifecycle/projected/projected.component';
import { ReportsModule } from './reports/reports.module';
import { ThrowingChildComponent } from './error-handler/zones/throwing-child.component';
import { ZonesComponent } from './error-handler/zones/zones.component';
import { DiTmplContainerComponent } from './di/di-tmpl-container/di-tmpl-container.component';
import { DiDirTmplContainerDirective } from './di/di-dir-tmpl-container.directive';
import { DiTmplContainer2Component } from './di/di-tmpl-container2/di-tmpl-container2.component';
import { DiTmplContentDirective } from './di/di-tmpl-container2/di-tmpl-content.directive';
import { RxjsErrAsyncPipeComponent } from './error-handler/rxjs-err-async-pipe.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { ChangeDetectionModule } from './change-detection/change-detection.module';
import { ExtensionEgsModule } from './extension-egs/extension-egs.module';
import { SharedModule } from '../shared/shared.module';
import { RxIntervalErrorComponent } from './error-handler/rx/rx-interval-error.component';
import { IntervalErrorCountedComponent } from './error-handler/rx/interval-error-counted.component';
import { ControlFlowComponent } from './error-handler/rx/control-flow.component';
import { IntervalErrorComponent as NoRxIntervalErrorComponent } from './error-handler/no-rx/interval-error.component';
import { IntervalErrorCountedComponent as NoIntervalErrorCountedComponent } from './error-handler/no-rx/interval-error-counted.component';

@NgModule({
  declarations: [
    ZonesComponent,
    ThrowingChildComponent,
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
    DiTmplContentDirective,
    RxjsErrAsyncPipeComponent,
    ErrorHandlerComponent,
    RxIntervalErrorComponent,
    IntervalErrorCountedComponent,
    ControlFlowComponent,
    NoRxIntervalErrorComponent,
    NoIntervalErrorCountedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReportsModule,
    MainRoutingModule,
    ChangeDetectionModule,
    ExtensionEgsModule,
    SharedModule
  ]
})
export class MainModule { }
