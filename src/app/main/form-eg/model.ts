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

export interface OrderLinePartial {
    quantity?: number;
    unitValue?: number;
    productName?: string;
}


export class OrderLine {
    id = ++nextId;
    quantity = 1;
    unitValue: number;
    productName: string;
    constructor(data: OrderLinePartial = {}) {
        Object.assign(this, data);
    }
    get lineTotal() {
        return this.quantity * this.unitValue;
    }
}


export function getExampleOrderLine() {
    return new OrderLine({
    unitValue: Math.floor(Math.random() * 10),
        productName: 'Phone'
    });
}

export function getExampleOrder() {
    return new Order({
        placedOn: new Date(),
        customerName: 'CC',
        lines: [0, 0].map(getExampleOrderLine)
    });
}
