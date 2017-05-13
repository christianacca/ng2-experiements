import { Injectable } from '@angular/core';
import { Router, RouterState } from '@angular/router';

@Injectable()
export class ComponentLevelService {
  routerState: RouterState;
  value = 'CompParentService: provided by RoutingEgsComponent';
  constructor(router: Router) {
    this.routerState = router.routerState;
    console.log('CompParentService.url:', router.routerState.snapshot.url);
  }
}
