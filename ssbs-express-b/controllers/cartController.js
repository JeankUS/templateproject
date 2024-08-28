const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({ where: { idcart: req.params.idcart } });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving cart items' });
  }
};

exports.addItemToCart = async (req, res) => {
  const { idcart, idproduct, quantity } = req.body;
  try {
    const newItem = await CartItem.create({
      idcart,
      idproduct,
      quantity,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
};

// Add update and delete methods similarly
