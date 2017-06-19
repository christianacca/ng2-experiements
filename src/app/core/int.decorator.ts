import { addPropertyTrait, PropertyTrait } from './add-property-trait';


export function parseValue(value: any) {
    if (value == null || typeof value === 'number') { return value; }

    return parseInt(value, 10);
}

const propertyTrait: PropertyTrait = {
    parser: parseValue
};
export function int(target: any, propertyKey: string) {
    addPropertyTrait(target, propertyKey, propertyTrait);
}
