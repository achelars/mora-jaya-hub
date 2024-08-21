const Payment = require('../models/Payment');
const Order = require('../models/Order');

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({
            include: [
                { model: Order, attributes: ['order_id', 'total_amount'] }
            ],
        });
        res.json(payments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id, {
            include: [
                { model: Order, attributes: ['order_id', 'total_amount'] }
            ],
        });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createPayment = async (req, res) => {
    try {
        const { order_id, transaction_id, amount_paid, payment_method } = req.body;

        const order = await Order.findByPk(order_id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const newPayment = await Payment.create({
            order_id,
            transaction_id,
            amount_paid,
            payment_method,
            payment_status: 'Pending', 
        });

        res.status(201).json(newPayment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        payment.payment_status = status || payment.payment_status;
        await payment.save();

        res.json(payment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        await payment.destroy();
        res.json({ message: 'Payment deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
