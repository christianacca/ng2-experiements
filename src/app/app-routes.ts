import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { ReportListComponent, ReportListResolve } from './reports/reports.module'

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
    }
];

export let AppRoutingModule = RouterModule.forRoot(routes);