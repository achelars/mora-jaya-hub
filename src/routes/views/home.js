const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Fetch featured products and promotions using the correct API endpoints
        const [featuredProductsResponse, promotionsResponse] = await Promise.all([
            axios.get('http://localhost:3000/api/featuredProducts'),
            axios.get('http://localhost:3000/api/promotions')
        ]);

        const featuredProducts = featuredProductsResponse.data;
        const promotions = promotionsResponse.data;

        res.render('home', { featuredProducts, promotions });
    } catch (error) {
        console.error('Error fetching data for home page:', error);
        res.status(500).render('500', { message: 'Internal Server Error' });
    }
});

module.exports = router;
