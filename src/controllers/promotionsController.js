const Promotion = require('../models/Promotion');

exports.getAllPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.findAll();
        res.json(promotions);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPromotionById = async (req, res) => {
    try {
        const promotion = await Promotion.findByPk(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }
        res.json(promotion);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createPromotion = async (req, res) => {
    try {
        const { title, content, display_start_date, display_end_date } = req.body;

        const newPromotion = await Promotion.create({
            title,
            content,
            display_start_date,
            display_end_date,
        });

        res.status(201).json(newPromotion);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePromotion = async (req, res) => {
    try {
        const { title, content, display_start_date, display_end_date } = req.body;

        const promotion = await Promotion.findByPk(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        promotion.title = title || promotion.title;
        promotion.content = content || promotion.content;
        promotion.display_start_date = display_start_date || promotion.display_start_date;
        promotion.display_end_date = display_end_date || promotion.display_end_date;

        await promotion.save();
        res.json(promotion);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deletePromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findByPk(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        await promotion.destroy();
        res.json({ message: 'Promotion deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
