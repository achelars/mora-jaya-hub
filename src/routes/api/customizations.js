const express = require('express');
const { getAllCustomizations, getCustomizationById, createCustomization, updateCustomization, deleteCustomization } = require('../../controllers/customizationsController');
const router = express.Router();

router.get('/', getAllCustomizations); 
router.get('/:id', getCustomizationById);
router.post('/', createCustomization); 
router.put('/:id', updateCustomization); 
router.delete('/:id', deleteCustomization); 

module.exports = router;
