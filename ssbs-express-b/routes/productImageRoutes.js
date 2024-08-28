const express = require('express');
const router = express.Router();
const productImageController = require('../controllers/productImageController');

router.get('/', productImageController.getAllImages);
router.post('/', productImageController.createImage);
router.delete('/:id', productImageController.deleteImage);

module.exports = router;
