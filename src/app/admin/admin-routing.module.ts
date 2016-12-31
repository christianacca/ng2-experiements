import { Route, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Route[] = [
    {
        path: '', component: AdminComponent, resolve: {
            title: 'AdminTitleResolve'
        }
    }
];

export default RouterModule.forChild(routes);   