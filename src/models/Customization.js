const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const Customization = sequelize.define('Customization', {
    customization_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'product_id',
        },
    },
    option_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option_value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    additional_cost: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
});

Customization.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Customization;
