import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class DebugRouteReuseStrategy implements RouteReuseStrategy {

    private calcKey(route: ActivatedRouteSnapshot) {
        let next = route;
        let url = '';
        while (next) {
            if (next.url) {
                url = next.url.join('/');
            }
            next = next.firstChild;
        }
        return url;
    }

    private logRouteKey(route: ActivatedRouteSnapshot, prefix: string = '') {
        const value = this.calcKey(route);
        console.log(prefix + 'RouteKey', value);
    }
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.groupCollapsed('DebugRouteReuseStrategy.shouldDetach');
        console.log(route);
        console.groupEnd();
        return false;
    }
    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
        console.groupCollapsed('DebugRouteReuseStrategy.store');
        console.log('route', route);
        console.log('detachedTree', detachedTree);
        console.groupEnd();
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.groupCollapsed('DebugRouteReuseStrategy.shouldAttach');
        this.logRouteKey(route);
        console.log(route);
        console.groupEnd();
        return false;
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        console.groupCollapsed('DebugRouteReuseStrategy.retrieve');
        this.logRouteKey(route);
        console.log(route);
        console.groupEnd();
        return null;
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        const defaultDecision = future.routeConfig === curr.routeConfig;
        console.groupCollapsed('DebugRouteReuseStrategy.shouldReuseRoute');
        this.logRouteKey(future, 'future');
        this.logRouteKey(future, 'curr');
        console.log('future', future);
        console.log('curr', curr);
        console.log('default decision', defaultDecision);
        console.groupEnd();
        return defaultDecision;
    }
}
