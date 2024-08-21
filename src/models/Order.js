const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    shipping_street_address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    shipping_city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shipping_state: {
        type: DataTypes.STRING,
    },
    shipping_postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shipping_country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payment_status: {
        type: DataTypes.ENUM('Pending', 'Completed', 'Failed'),
        allowNull: false,
        defaultValue: 'Pending',
    },
    order_status: {
        type: DataTypes.ENUM('Processing', 'Shipped', 'Delivered', 'Cancelled'),
        allowNull: false,
        defaultValue: 'Processing',
    },
});

Order.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Order;
