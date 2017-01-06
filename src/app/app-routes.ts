import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { ReportListComponent, ReportListResolve } from './reports/reports.module'

import { FormEgComponent } from './form-eg/form-eg.component';
import { FormHybridComponent } from './form-hybrid/form-hybrid.component';

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
    }
];

export let AppRoutingModule = RouterModule.forRoot(routes);