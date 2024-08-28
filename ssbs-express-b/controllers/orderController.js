const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

exports.createOrder = async (req, res) => {
  const { iduser, status, total, items } = req.body;
  try {
    const newOrder = await Order.create({ iduser, status, total });
    const orderItems = items.map(item => ({
      idorder: newOrder.idorder,
      idproduct: item.idproduct,
      quantity: item.quantity,
      price: item.price,
    }));
    await OrderItem.bulkCreate(orderItems);
    res.status(201).json({ order: newOrder, items: orderItems });
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ where: { idorder: req.params.idorder } });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving order' });
  }
};

// Add update and delete methods similarly
