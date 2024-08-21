const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CustomizationOption = sequelize.define('CustomizationOption', {
    customization_option_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
        allowNull: false,
        defaultValue: 0,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'customization_options',
    timestamps: false,
});

module.exports = CustomizationOption;
