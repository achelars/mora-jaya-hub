const express = require('express');
const { getAllPayments, getPaymentById, createPayment, updatePaymentStatus, deletePayment } = require('../../controllers/paymentsController');
const router = express.Router();

router.get('/', getAllPayments); 
router.get('/:id', getPaymentById); 
router.post('/', createPayment); 
router.put('/:id/status', updatePaymentStatus); 
router.delete('/:id', deletePayment); 

module.exports = router;
