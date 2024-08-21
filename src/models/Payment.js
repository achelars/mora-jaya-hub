const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order'); 

const Payment = sequelize.define('Payment', {
    payment_id: {
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
    transaction_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    amount_paid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payment_status: {
        type: DataTypes.ENUM('Pending', 'Completed', 'Failed'),
        allowNull: false,
        defaultValue: 'Pending',
    },
});

Payment.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = Payment;
