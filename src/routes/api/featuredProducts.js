// routes/api/featuredProducts.js

const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// Endpoint to get featured products
router.get('/', async (req, res) => {
    try {
        // Fetch some featured products, ordering by creation date for example
        const featuredProducts = await Product.findAll({
            limit: 4, // Limit to 4 products for example
            order: [['created_at', 'DESC']] // Order by creation date (or any other existing column)
        });

        res.json(featuredProducts);
    } catch (error) {
        console.error('Error fetching featured products:', error);
        res.status(500).json({ error: 'Failed to fetch featured products' });
    }
});

module.exports = router;
