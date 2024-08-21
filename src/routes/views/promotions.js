const express = require('express');
const router = express.Router();
const Promotion = require('../../models/Promotion');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
    try {
        const currentDate = new Date();
        const promotions = await Promotion.findAll({
            where: {
                display_start_date: { [Op.lte]: currentDate },
                display_end_date: { [Op.gte]: currentDate }
            }
        });
        res.json(promotions);
    } catch (error) {
        console.error('Error fetching promotions:', error);
        res.status(500).json({ error: 'Failed to fetch promotions' });
    }
});

module.exports = router;
