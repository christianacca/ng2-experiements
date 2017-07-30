import { Route, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { LazyModuleBootstrapper } from '../bootstrapping';

const routes: Route[] = [
    {
        path: '',
        canActivate: [LazyModuleBootstrapper],
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
