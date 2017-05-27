import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class RouteAlwaysReuseStrategy implements RouteReuseStrategy {
    private handlers: { [key: string]: DetachedRouteHandle } = {};

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
        const decision = true;
        console.groupCollapsed('RouteAlwaysReuseStrategy.shouldDetach');
        this.logRouteKey(route);
        console.log('decision', decision);
        console.log(route);
        console.groupEnd();
        return decision;
    }
    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
        console.groupCollapsed('RouteAlwaysReuseStrategy.store');
        console.log('route', route);
        console.log('detachedTree', detachedTree);
        console.groupEnd();
        this.handlers[this.calcKey(route)] = detachedTree;
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const decision = !!route.routeConfig && !!this.handlers[this.calcKey(route)];
        console.groupCollapsed('RouteAlwaysReuseStrategy.shouldAttach');
        this.logRouteKey(route);
        console.log('decision', decision);
        console.log(route);
        console.groupCollapsed();
        return decision;
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        const existingTree = !route.routeConfig ? null : this.handlers[this.calcKey(route)];
        console.groupCollapsed('RouteAlwaysReuseStrategy.retrieve');
        this.logRouteKey(route);
        console.log(route);
        console.log('existing tree', existingTree);
        console.groupEnd();
        return existingTree;
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        const defaultDecision = future.routeConfig === curr.routeConfig;
        const decison = this.calcKey(curr) === this.calcKey(future);
        console.groupCollapsed('RouteAlwaysReuseStrategy.shouldReuseRoute');
        this.logRouteKey(future, 'future');
        this.logRouteKey(curr, 'curr');
        console.log('decision', decison);
        console.log('default decision', defaultDecision);
        console.log('future', future);
        console.log('curr', curr);
        console.groupEnd();
        return decison;
    }
}
