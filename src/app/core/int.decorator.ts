import { convert } from './convert.decorator';

function parseValue(value: any) {
    if (value == null || typeof value === 'number') { return value; }

    return parseInt(value, 10);
}

export const int = convert(parseValue);
