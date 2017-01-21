export class Order {
    placedOn: Date;
    customerName: string;
}

export class OrderLine {
    quantity: number;
    unitValue: number;
    productName: string;
    get lineTotal() {
        return this.quantity * this.unitValue;
    }
}