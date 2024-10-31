import OrderCommandHandler from '@root/commandHandler/OrderCommandHandler';
import OrderRepository from '@repository/OrderRepository';
import CustomerRepository from '@repository/CustomerRepository';
import ProductRepository from '@repository/ProductRepository';
const orderRepository = new OrderRepository();
const customerRepository = new CustomerRepository();
const productRepository = new ProductRepository();
const orderCommandHandler = new OrderCommandHandler(orderRepository, customerRepository, productRepository);

import OrderQueryHandler from "@root/queryHandler/OrderQueryHandler";
const orderQueryHandler = new OrderQueryHandler();

export default class OrderController {

    async createOrder(req, res): void {
        const orderDetail = req.body;
        const userId = 1;
        const command = {
            name: 'createOrder',
            payload: {
                userId,
                ...orderDetail
            }
        };

        const order = await orderCommandHandler.createOrder(command);

        // const event = {
        //     event: 'ordering',
        //     type: 'order_created',
        //     ...order
        // };
        // const payload = [{
        //     topic: event.event,
        //     key: order.orderId,
        //     messages: JSON.stringify(event)
        // }];
        // producer.send(payload, (err, data) => {
        //     console.log('sent ordering.order_created event');
        // });

        res.json(order);
    }

    async payOrder(req, res) {
        const { orderId } = req.params;

        const command = {
            name: 'payOrder',
            payload: {
                userId: 1,
                orderId
            }
        };

        await orderCommandHandler.payOrder(command);

        // const event = {
        //     event: 'ordering',
        //     type: 'order_paid',
        //     orderId
        // };
        // const payload = [{
        //     topic: event.event,
        //     key: orderId,
        //     messages: JSON.stringify(event)
        // }];
        // producer.send(payload, (err, data) => {
        //     console.log('sent ordering.order_paid event');
        // });

        res.json('ok');
    }

    async confirmOrder(req, res) {
        const { orderId } = req.params;

        const command = {
            name: 'confirmOrder',
            payload: {
                userId: 1,
                orderId
            }
        };
        await orderCommandHandler.confirmOrder(command);

        // const event = {
        //     event: 'ordering',
        //     type: 'order_confirmed',
        //     orderId
        // };
        // const payload = [{
        //     topic: event.event,
        //     key: orderId,
        //     messages: JSON.stringify(event)
        // }];
        // producer.send(payload, (err, data) => {
        //     console.log('sent ordering.order_paid event');
        // });

        res.json('ok');
    }

    async getOrders(req, res) {
        res.json(await orderQueryHandler.getOrders());
    }

    async getOrder(req, res) {
        const { orderId } = req.params;
        res.json(await orderQueryHandler.getOrder(orderId));
    }
}