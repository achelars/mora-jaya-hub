const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const User = require('../models/User');

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User, attributes: ['name', 'email'] }, 
                { model: OrderItem, include: [Product] }
            ],
        });
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['name', 'email'] }, 
                { model: OrderItem, include: [Product] }
            ],
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { user_id, total_amount, shipping_address, orderItems } = req.body;

        const order = await Order.create({
            user_id,
            total_amount,
            shipping_street_address: shipping_address.street,
            shipping_city: shipping_address.city,
            shipping_state: shipping_address.state,
            shipping_postal_code: shipping_address.postal_code,
            shipping_country: shipping_address.country,
        });

        const items = await Promise.all(orderItems.map(async (item) => {
            const product = await Product.findByPk(item.product_id);
            if (!product) {
                throw new Error(`Product not found: ${item.product_id}`);
            }
            return await OrderItem.create({
                order_id: order.order_id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: product.base_price,
            });
        }));

        res.status(201).json({ order, items });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.order_status = status || order.order_status;
        await order.save();

        res.json(order);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.destroy();
        res.json({ message: 'Order deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
