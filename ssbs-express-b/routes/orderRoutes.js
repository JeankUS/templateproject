const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/:idorder', orderController.getOrder);
router.post('/', orderController.createOrder);
// Other routes: PUT, DELETE, etc.

module.exports = router;
