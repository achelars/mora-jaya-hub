const Product = require('./Product');
const CustomizationOption = require('./CustomizationOption');

// Define the many-to-many relationship between Product and CustomizationOption without timestamps
Product.belongsToMany(CustomizationOption, {
    through: 'product_customizations',
    foreignKey: 'product_id',
    timestamps: false // Disable timestamps in the join table
});

CustomizationOption.belongsToMany(Product, {
    through: 'product_customizations',
    foreignKey: 'customization_option_id',
    timestamps: false // Disable timestamps in the join table
});
