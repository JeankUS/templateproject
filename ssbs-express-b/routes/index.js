const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const cartRoutes = require('./cartRoutes');
const offerRoutes = require('./offerRoutes');
const orderRoutes = require('./orderRoutes');
const filterRoutes = require('./productFilterRoutes');
const productImageRoutes = require('./productImageRoutes');
const cartItemRoutes = require('./cartItemRoutes'); // Nueva ruta
const orderItemRoutes = require('./orderItemRoutes'); // Nueva ruta
const productFilterRoutes = require('./productFilterRoutes');
const productFilterValueRoutes = require('./productFilterValueRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/offers', offerRoutes);
router.use('/carts', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/filters', filterRoutes);
router.use('/product-images', productImageRoutes);
router.use('/cart-items', cartItemRoutes); // Nueva ruta
router.use('/order-items', orderItemRoutes); // Nueva ruta
router.use('/product-filters', productFilterRoutes);
router.use('/product-filter-values', productFilterValueRoutes);

module.exports = router;
