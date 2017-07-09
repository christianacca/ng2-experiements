import { ReportListComponent, ReportListResolve } from './reports/reports.module';
import { Route, RouterModule } from '@angular/router';

import { DiComponent } from './di/di.component';
import { DirLifecycleComponent } from './dir-lifecycle/dir-lifecycle.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { NgModule } from '@angular/core';
import { RxjsErrAsyncPipeComponent } from './error-handler/rxjs-err-async-pipe.component';
import { ZonesComponent } from './error-handler/zones/zones.component';
import { RxjsCatchOperatorComponent } from './error-handler/rxjs-catch-operator.component';

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
                component: DiComponent,
                path: 'di'
            },
            {
                component: DirLifecycleComponent,
                path: 'dir-lifecycle'
            },
            {
                component: ErrorHandlerComponent,
                path: 'error-handler-basic'
            },
            {
                component: ZonesComponent,
                path: 'error-handler-zonejs'
            },
            {
                component: RxjsErrAsyncPipeComponent,
                path: 'rxjs-err-async-pipe'
            },
            {
                component: RxjsCatchOperatorComponent,
                path: 'rxjs-catch-operator'
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
