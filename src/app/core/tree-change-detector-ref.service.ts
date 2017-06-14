import { Injectable, ChangeDetectorRef, NgZone } from '@angular/core';

const later = Promise.resolve(null);

@Injectable()
export class TreeChangeDetectorRef {
    asaps: ChangeDetectorRef[] = [];

    constructor(ngZone: NgZone) {
        ngZone.onStable.subscribe(_ => {
            if (this.asaps.length === 0) {
                return;
            }

            const refs = this.asaps;
            this.asaps = [];
            ngZone.run(() => {
                refs.forEach(cdr => cdr.markForCheck());
            });
        });
    }

    markForCheckAsap(cdr: ChangeDetectorRef) {
        this.asaps.push(cdr);
    }
}
