import { ReportListComponent, ReportListResolve } from './reports/reports.module';
import { Route, RouterModule } from '@angular/router';

import { DiComponent } from './di/di.component';
import { DirLifecycleComponent } from './dir-lifecycle/dir-lifecycle.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { FormEgComponent } from './form-eg/form-eg.component';
import { FormHybridComplexComponent } from './form-hybrid-complex/form-hybrid-complex.component';
import { FormHybridComponent } from './form-hybrid/form-hybrid.component';
import { NgModule } from '@angular/core';
import { RxjsErrAsyncPipeComponent } from './rxjs/rxjs-err-async-pipe/rxjs-err-async-pipe.component';
import { ZonesComponent } from './zones/zones.component';

// can't get lazy loading of admin module to work

// const routes: Route[] = [{
//     path: 'admin', loadChildren: './admin/admin.module#AdminModule'
// }];


// having to use empty routes array until the above is working
const routes: Route[] = [
    {
        component: ReportListComponent,
        path: 'reports',
        resolve: {
            reports: ReportListResolve
        }
    },
    {
        component: FormEgComponent,
        path: 'form-eg'
    },
    {
        component: FormHybridComponent,
        path: 'form-hybrid'
    },
    {
        component: FormHybridComplexComponent,
        path: 'form-hybrid-complex'
    },
    {
        component: ZonesComponent,
        path: 'zones'
    },
    {
        component: DiComponent,
        path: 'di'
    },
    {
        component: DirLifecycleComponent,
        path: 'dir-lifecycle'
    },
    {
        component: ErrorHandlerComponent,
        path: 'error-handler'
    },
    {
        component: RxjsErrAsyncPipeComponent,
        path: 'rxjs-err-async-pipe'
    }
];

export let AppRoutingModule = RouterModule.forRoot(routes);
