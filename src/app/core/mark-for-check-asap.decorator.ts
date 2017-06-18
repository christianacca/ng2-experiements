import { ChangeDetectorRef } from '@angular/core';
import { TreeChangeDetectorRef } from './tree-change-detector-ref.service';
import { addPropertyTrait, PropertyTrait } from './add-property-trait';

export interface CanMarkForCheckAsap {
    _cdr: ChangeDetectorRef;
    _tcdr: TreeChangeDetectorRef
}

const isFirstCheckKey = Symbol('markForCheckAsap.isFirstCheck');

function beforeSet(this: CanMarkForCheckAsap, newValue: any, oldValue: any) {
        if (!this[isFirstCheckKey] && newValue !== oldValue) {
            this._tcdr.markForCheckAsap(this._cdr);
        }
        this[isFirstCheckKey] = false;
        return newValue;
    }

const propertyTrait: PropertyTrait = {
    beforeSet
};

export function markForCheckAsap(target: any, propertyKey: string) {
    addPropertyTrait(target, propertyKey, propertyTrait);
}
