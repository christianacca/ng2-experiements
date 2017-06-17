import { addOrExtendProperty } from './langs-util';

function parseValue(value: any) {
    if (value == null || typeof value === 'number') { return value; }

    return parseInt(value, 10);
}

export function int(target: any, propertyKey: string) {
    const transform = { parser: parseValue };
    addOrExtendProperty(target, propertyKey, transform);
}
