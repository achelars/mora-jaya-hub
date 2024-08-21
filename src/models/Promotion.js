const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product'); 

const Promotion = sequelize.define('Promotion', {
    promotion_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    display_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    display_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

Promotion.belongsToMany(Product, { through: 'ProductPromotions', foreignKey: 'promotion_id' });
Product.belongsToMany(Promotion, { through: 'ProductPromotions', foreignKey: 'product_id' });

module.exports = Promotion;
