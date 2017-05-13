import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class ResolveEg implements Resolve<boolean> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('ResolveEg run');
        return true;
    }
}
