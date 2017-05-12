import { ReportListComponent, ReportListResolve } from './reports/reports.module';
import { Route, RouterModule } from '@angular/router';

import { DiComponent } from './di/di.component';
import { DirLifecycleComponent } from './dir-lifecycle/dir-lifecycle.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { NgModule } from '@angular/core';
import { RxjsErrAsyncPipeComponent } from './rxjs/rxjs-err-async-pipe/rxjs-err-async-pipe.component';
import { ZonesComponent } from './zones/zones.component';

const routes: Route[] = [
    {
        path: '',
        children: [
            { path: 'forms', loadChildren: './forms/forms.module#FormsModule'},
            {
                component: ReportListComponent,
                path: 'reports',
                resolve: {
                    reports: ReportListResolve
                }
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
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {

}
