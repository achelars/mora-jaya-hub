const express = require('express');
const { getAllShipments, getShipmentById, createShipment, updateShipmentStatus, deleteShipment } = require('../../controllers/shippingController');
const router = express.Router();

router.get('/', getAllShipments); 
router.get('/:id', getShipmentById); 
router.post('/', createShipment); 
router.put('/:id/status', updateShipmentStatus); 
router.delete('/:id', deleteShipment); 

module.exports = router;
