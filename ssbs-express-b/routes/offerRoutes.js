const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

router.get('/', offerController.getAllOffers);
router.post('/', offerController.createOffer);
// Other routes: PUT, DELETE, etc.

module.exports = router;
