const OrderModel = require('mongoose').model('Order');

class Order {
    public orderId: string;
    public lineItems: Array<LineItem>;
    public status: number;
}

class LineItem {
    public productId: string;
    public productName: string;
    public quantity: number;
    public unitPrice: number;
}

class OrderSummary {
    public orderId: string;
    public status: number;
    public subTotal: number;
    public totalQuantity: number;

    constructor(orderId: string, status: number, subTotal: number, totalQuantity: number) {
        this.orderId = orderId;
        this.status = status;
        this.subTotal = subTotal;
        this.totalQuantity = totalQuantity;
    }
}

class OrderList {
    public total: number;
    public data: Array<OrderSummary>;
    public type: string;
    
    constructor(total: number, data: Array<OrderSummary>) {
        this.total = total;
        this.data = data;
        this.type = "order";
    }
}

export default class OrderQueryHandler {

    async getOrder(orderId: any): Promise<any> {
        const order = await OrderModel.findOne({ orderId });
        return order;
    }

    async getOrders() : Promise<Array<OrderSummary>> {
        const total = await OrderModel.countDocuments({});
        const data = (await OrderModel.find()).map(order => {
            return new OrderSummary(order.orderId, order.status, order.subTotal, order.totalQuantity);
        });
        return new OrderList(total, data);
    }
}
