const Shipping = require('../models/Shipping');
const Order = require('../models/Order');

exports.getAllShipments = async (req, res) => {
    try {
        const shipments = await Shipping.findAll({
            include: [
                { model: Order, attributes: ['order_id', 'total_amount'] }
            ],
        });
        res.json(shipments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getShipmentById = async (req, res) => {
    try {
        const shipment = await Shipping.findByPk(req.params.id, {
            include: [
                { model: Order, attributes: ['order_id', 'total_amount'] }
            ],
        });
        if (!shipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }
        res.json(shipment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createShipment = async (req, res) => {
    try {
        const { order_id, tracking_number, shipping_method } = req.body;

        const order = await Order.findByPk(order_id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const newShipment = await Shipping.create({
            order_id,
            tracking_number,
            shipping_method,
        });

        res.status(201).json(newShipment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateShipmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const shipment = await Shipping.findByPk(req.params.id);
        if (!shipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }

        shipment.shipping_status = status || shipment.shipping_status;
        await shipment.save();

        res.json(shipment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteShipment = async (req, res) => {
    try {
        const shipment = await Shipping.findByPk(req.params.id);
        if (!shipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }

        await shipment.destroy();
        res.json({ message: 'Shipment deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
