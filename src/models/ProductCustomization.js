const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const OrderItem = require('./OrderItem'); 
const Customization = require('./Customization'); 

const ProductCustomization = sequelize.define('ProductCustomization', {
    product_customization_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    order_item_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: OrderItem,
            key: 'order_item_id',
        },
    },
    customization_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Customization,
            key: 'customization_id',
        },
    },
});

ProductCustomization.belongsTo(OrderItem, { foreignKey: 'order_item_id' });
ProductCustomization.belongsTo(Customization, { foreignKey: 'customization_id' });

module.exports = ProductCustomization;
