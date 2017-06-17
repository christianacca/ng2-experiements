import { ChangeDetectorRef } from '@angular/core';
import { TreeChangeDetectorRef } from './tree-change-detector-ref.service';
import { addOrExtendProperty } from './langs-util';

export interface CanMarkForCheckAsap {
    _cdr: ChangeDetectorRef;
    _tcdr: TreeChangeDetectorRef
}

export function markForCheckAsap(target: any, propertyKey: string) {
    let isFirstCheck = true;

    function setter(this: CanMarkForCheckAsap, value: any) {
        if (!isFirstCheck && value !== this[propertyKey]) {
            this._tcdr.markForCheckAsap(this._cdr);
        }
        isFirstCheck = false;
        return value;
    }

    const transform = { parser: setter };
    addOrExtendProperty(target, propertyKey, transform);
}
