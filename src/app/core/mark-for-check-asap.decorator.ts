import { ChangeDetectorRef, OnChanges, Type, SimpleChanges } from '@angular/core';
import { TreeChangeDetectorRef } from './tree-change-detector-ref.service';
import { addPropertyTrait, PropertyTrait } from './add-property-trait';

interface CanMarkForCheckAsap {
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

function MarkForCheck(target: CanMarkForCheckAsap, propertyKey: string, property?: PropertyDescriptor) {
    return addPropertyTrait(target, propertyKey, propertyTrait, property);
}

const markForCheckEnabledMetadataKey = Symbol('markForCheckEnabled');

function MarkForCheckEnabled(enabled: boolean = true) {
    return Reflect.metadata(markForCheckEnabledMetadataKey, enabled);
}

function isMarkForCheckEnabled(target: any, propertyKey: string) {
    const meta = Reflect.getMetadata(markForCheckEnabledMetadataKey, target, propertyKey);
    return meta === undefined || !!meta;
}

function OnChangesMarkForCheck<T extends Type<OnChanges>>(constructor: T): T {
    const original = constructor.prototype.ngOnChanges as (changes: SimpleChanges) => void;
    const patched = function markedForCheckOnChanges(this: CanMarkForCheckAsap, changes: SimpleChanges) {
        let hasChanges = false;
        // tslint:disable-next-line:forin
        for (const name in changes) {
            const change = changes[name];
            if (change.isFirstChange()
                || change.currentValue === change.previousValue
                || !isMarkForCheckEnabled(this, name)) {
                continue;
            }

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

export { CanMarkForCheckAsap, MarkForCheck, MarkForCheckEnabled, OnChangesMarkForCheck }
