const express = require('express');
const router = express.Router();
const Cart = require('../../models/Cart'); // Assuming you have a Cart model
const Product = require('../../models/Product');

router.post('/add', async (req, res) => {
    const { product_id, customizations, quantity } = req.body;

    try {
        // Fetch the product details
        const product = await Product.findByPk(product_id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Calculate the final price with customizations
        let finalPrice = parseFloat(product.base_price);
        if (customizations) {
            for (const [optionType, optionValue] of Object.entries(customizations)) {
                const customization = await product.getCustomizationOptions({
                    where: { option_type: optionType, option_value: optionValue }
                });
                if (customization.length > 0) {
                    finalPrice += parseFloat(customization[0].additional_cost);
                }
            }
        }

        // Add to cart (you need to implement this logic based on your cart schema)
        await Cart.addProductToCart(product, quantity, finalPrice, customizations); // Assuming you have a method like this

        res.redirect('/cart');
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
