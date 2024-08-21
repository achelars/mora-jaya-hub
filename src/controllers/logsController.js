const Log = require('../models/Log');

exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Log.findAll();
        res.json(logs);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getLogById = async (req, res) => {
    try {
        const log = await Log.findByPk(req.params.id);
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.json(log);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
