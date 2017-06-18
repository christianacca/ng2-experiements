import { ElementRef } from '@angular/core';
import { TreeChangeDetectorRef } from './tree-change-detector-ref.service';
import { addPropertyTrait, PropertyTrait } from './add-property-trait';

export interface CanTest {
    _elem: ElementRef;
}

export function test(target: any, propertyKey: string) {
    let propertyValue: any;
    Object.defineProperty(target, propertyKey, {
        get: function () { return propertyValue; },
        set: function (this: CanTest, v: any) { propertyValue = v; },
    });
}
