const express = require('express');
const { getAllLogs, getLogById } = require('../../controllers/logsController');
const router = express.Router();

router.get('/', getAllLogs); 
router.get('/:id', getLogById); 

module.exports = router;
