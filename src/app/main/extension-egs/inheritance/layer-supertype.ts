import { DoCheck, OnInit } from '@angular/core';

export class LayerSupertype implements DoCheck, OnInit {

    constructor() {
        console.log('LayerSupertype.ctor');
    }

    ngOnInit() {
        // this is NOT called because BaseComponent omits a call to super.ngOnInit
        console.log('LayerSupertype.ngOnInit');
    }

    ngDoCheck(): void {
        console.log('LayerSupertype.ngDoCheck');
    }
}
