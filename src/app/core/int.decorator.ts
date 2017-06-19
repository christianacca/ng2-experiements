import { convert } from './convert.decorator';

export function parseValue(value: any) {
    if (value == null || typeof value === 'number') { return value; }

    return parseInt(value, 10);
}

export function int(target: any, propertyKey: string) {
    convert(parseValue)(target, propertyKey);
}
