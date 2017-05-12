import { Route, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Route[] = [
    {
        path: 'admin', loadChildren: './admin/admin.module#AdminModule'
    },
    {
        path: 'main', loadChildren: './main/main.module#MainModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
