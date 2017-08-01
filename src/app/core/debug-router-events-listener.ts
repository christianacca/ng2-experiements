import { Router } from '@angular/router';
import { Initializable } from '../module-sync-init';
import { Injectable } from '@angular/core';

@Injectable()
export class DebugRouterEventsListener implements Initializable {
    constructor(private router: Router) {}

    run() {
        this.router.events.subscribe(evt => {
            console.log(evt);
        });
    }
}


