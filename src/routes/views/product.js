const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const CustomizationOption = require('../../models/CustomizationOption');
const { Op } = require('sequelize');

router.get('/:product_id', async (req, res) => {
    try {
        const productId = req.params.product_id;

        // Fetch the main product details
        const product = await Product.findByPk(productId, {
            attributes: ['product_id', 'name', 'description', 'category', 'base_price', 'fabric_material', 'stock_level', 'image_url', 'created_at', 'updated_at']
        });

        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Fetch related products by category, excluding the current product
        const relatedProducts = await Product.findAll({
            where: {
                category: product.category,
                product_id: { [Op.ne]: productId }
            },
            limit: 4
        });

        // Fetch available customization options for the product
        const customizationOptions = await CustomizationOption.findAll({
            include: [{
                model: Product,
                where: { product_id: productId }
            }]
        });

        // Group customization options by type for easier display in the view
        const groupedCustomizations = customizationOptions.reduce((acc, option) => {
            if (!acc[option.option_type]) {
                acc[option.option_type] = [];
            }
            acc[option.option_type].push(option);
            return acc;
        }, {});

        res.render('product', { product, relatedProducts, groupedCustomizations });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
