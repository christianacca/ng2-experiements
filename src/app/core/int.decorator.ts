import { Convert } from './convert.decorator';

export function parseValue(value: any) {
    if (value == null || typeof value === 'number') { return value; }

    return parseInt(value, 10);
}

export function Int(target: any, propertyKey: string) {
    Convert(parseValue)(target, propertyKey);
}
