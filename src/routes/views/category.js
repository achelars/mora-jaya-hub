const express = require('express');
const { Op } = require('sequelize'); // Import Sequelize operators
const router = express.Router();
const Product = require('../../models/Product');

// Route to render the product listing (category) page
router.get('/', async (req, res) => {
    try {
        const { page = 1, category, fabric_material, price, sort, search } = req.query;
        const limit = 8; // Number of products per page
        const offset = (page - 1) * limit;

        // Build the where clause based on filters
        let whereClause = {};

        if (category) {
            whereClause.category = category;
        }

        if (fabric_material) {
            whereClause.fabric_material = fabric_material;
        }

        if (price) {
            if (price === 'low') {
                whereClause.base_price = { [Op.lt]: 50 };
            } else if (price === 'mid') {
                whereClause.base_price = { [Op.between]: [50, 100] };
            } else if (price === 'high') {
                whereClause.base_price = { [Op.gt]: 100 };
            }
        }

        if (search) {
            whereClause.name = { [Op.iLike]: `%${search}%` }; // Case-insensitive search
        }

        // Sorting logic
        let order = [];
        if (sort === 'price-asc') {
            order = [['base_price', 'ASC']];
        } else if (sort === 'price-desc') {
            order = [['base_price', 'DESC']];
        } else if (sort === 'newest') {
            order = [['created_at', 'DESC']];
        } else if (sort === 'category') {
            order = [['category', 'ASC']];
        } else if (sort === 'fabric_material') {
            order = [['fabric_material', 'ASC']];
        } else {
            order = [['name', 'ASC']]; // Default sorting by name
        }

        // Fetch the products with pagination
        const { count, rows: products } = await Product.findAndCountAll({
            where: whereClause,
            attributes: [
                'product_id', 'name', 'description', 'category', 
                'base_price', 'fabric_material', 'stock_level', 
                'image_url', 'created_at', 'updated_at'
            ],
            order,
            limit,
            offset
        });

        // Calculate total pages
        const totalPages = Math.ceil(count / limit);

        // Render the category page with products, pagination, filters, and sorting info
        res.render('category', {
            products,
            currentPage: parseInt(page, 10),
            totalPages,
            category: category || '',  // Ensure category is always defined
            fabric_material: fabric_material || '',  // Ensure fabric_material is always defined
            price: price || '', // Ensure price is always defined
            sort: sort || '',   // Ensure sort is always defined
            search: search || '' // Ensure search is always defined
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.render('category', { products: [], currentPage: 1, totalPages: 1 });
    }
});

module.exports = router;
