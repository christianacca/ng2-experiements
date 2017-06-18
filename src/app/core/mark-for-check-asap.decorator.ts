import { ChangeDetectorRef } from '@angular/core';
import { TreeChangeDetectorRef } from './tree-change-detector-ref.service';
import { addPropertyTrait, PropertyTrait } from './add-property-trait';

export interface CanMarkForCheckAsap {
    _cdr: ChangeDetectorRef;
    _tcdr: TreeChangeDetectorRef
}

const isFirstCheckKey = Symbol('markForCheckAsap.isFirstCheck');
interface FirstChecks {
    [key: string]: boolean;
}

function getOrAddFirstCheckCache(propertyKey: string, target: object) {
    const firstChecks = target[isFirstCheckKey] as FirstChecks;
    if (firstChecks && (propertyKey in firstChecks)) {
        return firstChecks;
    }
    return target[isFirstCheckKey] = Object.assign(firstChecks || {}, { [propertyKey]: true });
}

function beforeSet(newValue: any, oldValue: any, propertyKey: string, target: CanMarkForCheckAsap) {
    const firstChecks = getOrAddFirstCheckCache(propertyKey, target);
    if (!firstChecks[propertyKey] && newValue !== oldValue) {
        target._tcdr.markForCheckAsap(target._cdr);
    }
    firstChecks[propertyKey] = false;
    return newValue;
}

const propertyTrait: PropertyTrait = {
    beforeSet
};

export function markForCheckAsap(target: CanMarkForCheckAsap, propertyKey: string) {
    addPropertyTrait(target, propertyKey, propertyTrait);
}
