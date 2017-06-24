import { addPropertyTrait, PropertyTrait } from './add-property-trait';

export function Convert(convertor: (v: any) => any) {
    const propertyTrait: PropertyTrait = {
        parser: convertor
    };

    return function convert(target: any, propertyKey: string) {
        addPropertyTrait(target, propertyKey, propertyTrait);
    }
}
