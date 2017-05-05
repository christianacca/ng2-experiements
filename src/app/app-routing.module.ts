import { Route, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Route[] = [
    {
        path: 'admin', loadChildren: './admin/admin.module#AdminModule'
    },
    {
        path: 'main', loadChildren: './main/main.module#MainModule'
    }
];

export let AppRoutingModule = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules});
