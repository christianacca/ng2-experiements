import { Injectable, ChangeDetectorRef, NgZone } from '@angular/core';

const later = Promise.resolve(null);

// todo: detect cycles
// todo: support configuration to throw after n cycles detected

@Injectable()
export class TreeChangeDetectorRef {
    private asaps: ChangeDetectorRef[] = [];

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
        if (this.asaps.indexOf(cdr) !== -1) { return; }

        this.asaps.push(cdr);
    }
}
