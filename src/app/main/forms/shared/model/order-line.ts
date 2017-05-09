let nextId = 0;

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
