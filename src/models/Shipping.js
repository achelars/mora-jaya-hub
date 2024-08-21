const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order'); 

const Shipping = sequelize.define('Shipping', {
    shipping_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Order,
            key: 'order_id',
        },
    },
    tracking_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    shipping_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shipping_status: {
        type: DataTypes.ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled'),
        allowNull: false,
        defaultValue: 'Pending',
    },
});

Shipping.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = Shipping;
