import { OrderLine } from './order-line';

export interface OrderPartial {
    placedOn?: Date;
    customerName?: string;
    lines?: OrderLine[];
}
let nextId = 0;

export class Order {
    id = ++nextId;
    placedOn: Date;
    customerName: string;
    lines: OrderLine[];
    constructor(data: OrderPartial = {}) {
        Object.assign(this, data);
    }
}
