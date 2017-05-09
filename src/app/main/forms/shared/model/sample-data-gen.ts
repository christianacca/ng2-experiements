import { Order } from './order';
import { OrderLine } from './order-line';

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
