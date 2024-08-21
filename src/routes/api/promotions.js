const express = require('express');
const { getAllPromotions, getPromotionById, createPromotion, updatePromotion, deletePromotion } = require('../../controllers/promotionsController');
const router = express.Router();

router.get('/', getAllPromotions); 
router.get('/:id', getPromotionById); 
router.post('/', createPromotion); 
router.put('/:id', updatePromotion); 
router.delete('/:id', deletePromotion); 

module.exports = router;
