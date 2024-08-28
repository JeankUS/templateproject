const express = require('express');
const router = express.Router();
const productFilterValueController = require('../controllers/productFilterValueController');

router.get('/', productFilterValueController.getAllFilterValues);
router.get('/:id', productFilterValueController.getFilterValueById);
router.post('/', productFilterValueController.createFilterValue);
router.put('/:id', productFilterValueController.updateFilterValue);
router.delete('/:id', productFilterValueController.deleteFilterValue);

module.exports = router;
