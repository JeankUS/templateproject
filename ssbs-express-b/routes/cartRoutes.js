const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:idcart', cartController.getCartItems);
router.post('/', cartController.addItemToCart);
// Other routes: PUT, DELETE, etc.

module.exports = router;
