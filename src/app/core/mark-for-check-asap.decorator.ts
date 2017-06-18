import { ChangeDetectorRef, OnChanges, Type, SimpleChanges } from '@angular/core';
import { TreeChangeDetectorRef } from './tree-change-detector-ref.service';
import { addPropertyTrait, PropertyTrait, createTraitEnabledProperty } from './add-property-trait';

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

export function markForCheck(target: CanMarkForCheckAsap, propertyKey: string, property?: PropertyDescriptor) {
    return addPropertyTrait(target, propertyKey, propertyTrait, property);
}


export function onChangesMarkForCheckAsap<T extends Type<OnChanges>>(constructor: T): T {
    const original = constructor.prototype.ngOnChanges as (changes: SimpleChanges) => void;
    const patched = function markedForCheckOnChanges(this: CanMarkForCheckAsap, changes: SimpleChanges) {
        let hasChanges = false;
        // tslint:disable-next-line:forin
        for (const name in changes) {
            const change = changes[name];
            if (change.isFirstChange() || change.currentValue === change.previousValue) { continue; }

            hasChanges = true;
            break;
        }
        if (hasChanges) {
            this._tcdr.markForCheckAsap(this._cdr);
        }
        original.call(this, changes);
    };
    constructor.prototype.ngOnChanges = patched;
    return constructor;
}
