import { Route, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { LazyModuleRunner } from '../runnable';

const routes: Route[] = [
    {
        path: '',
        canActivate: [LazyModuleRunner],
        children: [
            {
                path: '',
                component: AdminComponent,
                resolve: {
                    title: 'AdminTitleResolve'
                }
            }
        ]
    }
];

export let AdminRoutingModule = RouterModule.forChild(routes);
