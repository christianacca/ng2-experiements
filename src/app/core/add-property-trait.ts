import { Type } from '@angular/core';

const traitsMapKey = Symbol('propertyExtensions');

export type BeforeSet = (newValue: any, oldValue: any, propertyKey: string, target: any) => void;

export type ValueTransformer = (value: any) => any;
export interface ValueTransform {
    parser?: ValueTransformer,
    formatter?: ValueTransformer
}

export interface PropertyTrait {
    parser?: ValueTransformer;
    formatter?: ValueTransformer;
    beforeSet?: BeforeSet;
}

interface PropertyTraitsMap {
    [property: string]: PropertyTrait[]
}

function getOrAddTraitStore(target: any, propertyKey: string) {
    if (!target[traitsMapKey]) {
        target[traitsMapKey] = {};
    }
    const traits = target[traitsMapKey] as PropertyTraitsMap;
    if (!traits[propertyKey]) {
        traits[propertyKey] = [];
    }
    return traits[propertyKey];
}

type Getter = () => any;
interface TraitEnabledGet extends Getter {
    runner: PropertyTraitRunner;
}
type Setter = (v: any) => void;
interface TraitEnabledSet extends Setter {
    runner: PropertyTraitRunner;
}


class PropertyTraitRunner {
    constructor(
        private traits: PropertyTrait[],
        public originalGet: () => any,
        public originalSet: (value: any) => void,
        private propertyKey: string) { }

    private get beforeSets() {
        return this.traits.map(t => t.beforeSet);
    }
    private get parsers() {
        return this.traits.map(t => t.parser);
    }
    private get formatters() {
        return this.traits.map(t => t.formatter);
    }

    createPropertyGetter() {
        if (!this.shouldOverrideGet()) { return this.originalGet; }

        const runner = this;
        const getter: TraitEnabledGet = function traitsEnabledGetter() {
            return (traitsEnabledGetter as TraitEnabledGet).runner.runGet(this);
        } as any;
        getter.runner = runner;
        return getter
    }

    createPropertySetter() {
        if (!this.shouldOverrideSet()) { return this.originalSet; }

        const runner = this;
        const setter: TraitEnabledSet = function traitsEnabledSetter(value: any) {
            (traitsEnabledSetter as TraitEnabledSet).runner.runSet(value, this);
        } as any;
        setter.runner = runner;
        return setter
    }

    private runGet(target: object) {
        const rawValue = this.originalGet.call(target);
        return this.transformValue(target, rawValue, this.formatters);
    }
    private runSet(value: any, target: object) {
        const oldValue = this.originalGet.call(target);
        const newValue = this.transformValue(target, value, this.parsers);
        this.beforeSets.forEach(f => f.call(target, newValue, oldValue, this.propertyKey, target));
        this.originalSet.call(target, newValue);
    }

    private shouldOverrideGet() {
        return this.traits.some(t => !!t.formatter);
    }
    private shouldOverrideSet() {
        return this.traits.some(t => !!t.parser || !!t.beforeSet);
    }

    private transformValue(target: object, value: any, transformers: ValueTransformer[]) {
        return transformers.reduce((acc, f) => f.call(target, acc), value);
    }
}

function getTraitRunner(property: PropertyDescriptor): PropertyTraitRunner {
    return (property.get && (property.get as any).runner) || (property.set && (property.set as any).runner)
}


function createBaseProperty(target: any, propertyKey: string): PropertyDescriptor {
    const key = Symbol(propertyKey);
    return {
        get: function () { return this[key]; },
        set: function (value: any) { this[key] = value },
        configurable: true,
        enumerable: true
    };
}


function createTraitEnabledProperty(propertyKey: string, baseProperty: PropertyDescriptor, traits: PropertyTrait[]) {
    const existingRunner = getTraitRunner(baseProperty);
    const baseGetter = existingRunner ? existingRunner.originalGet : baseProperty.get;
    const baseSetter = existingRunner ? existingRunner.originalSet : baseProperty.set;
    const runner = new PropertyTraitRunner(traits, baseGetter, baseSetter, propertyKey);
    return {
        get: runner.createPropertyGetter(),
        set: runner.createPropertySetter(),
        enumerable: baseProperty.enumerable,
        configurable: baseProperty.configurable
    }
}

export function addPropertyTrait(target: any, propertyKey: string, trait: PropertyTrait) {
    const traits = getOrAddTraitStore(target, propertyKey);

    if (traits.includes(trait)) { return; }

    traits.push(trait);
    let existingProperty = Object.getOwnPropertyDescriptor(target, propertyKey);
    if (!existingProperty) {
        existingProperty = createBaseProperty(target, propertyKey);
    }
    const property = createTraitEnabledProperty(propertyKey, existingProperty, traits);
    return Object.defineProperty(target, propertyKey, property);
}
