const Customization = require('../models/Customization');

exports.getAllCustomizations = async (req, res) => {
    try {
        const customizations = await Customization.findAll();
        res.json(customizations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCustomizationById = async (req, res) => {
    try {
        const customization = await Customization.findByPk(req.params.id);
        if (!customization) {
            return res.status(404).json({ message: 'Customization not found' });
        }
        res.json(customization);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createCustomization = async (req, res) => {
    try {
        const { product_id, option_type, option_value, additional_cost } = req.body;

        const newCustomization = await Customization.create({
            product_id,
            option_type,
            option_value,
            additional_cost,
        });

        res.status(201).json(newCustomization);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateCustomization = async (req, res) => {
    try {
        const { option_type, option_value, additional_cost } = req.body;

        const customization = await Customization.findByPk(req.params.id);
        if (!customization) {
            return res.status(404).json({ message: 'Customization not found' });
        }

        customization.option_type = option_type || customization.option_type;
        customization.option_value = option_value || customization.option_value;
        customization.additional_cost = additional_cost || customization.additional_cost;

        await customization.save();
        res.json(customization);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteCustomization = async (req, res) => {
    try {
        const customization = await Customization.findByPk(req.params.id);
        if (!customization) {
            return res.status(404).json({ message: 'Customization not found' });
        }

        await customization.destroy();
        res.json({ message: 'Customization deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
