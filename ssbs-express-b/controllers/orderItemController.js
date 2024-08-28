const { OrderItem, Product, Order } = require('../models');

// Obtener todos los ítems de todos los pedidos (útil para depuración o administración)
exports.getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll({
            include: [Product, Order]
        });
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener ítems de un pedido específico
exports.getItemsByOrderId = async (req, res) => {
    try {
        const { idorder } = req.params;
        const orderItems = await OrderItem.findAll({
            where: { idorder },
            include: [Product]
        });
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un ítem específico de un pedido
exports.getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderItem = await OrderItem.findByPk(id, {
            include: [Product, Order]
        });
        if (!orderItem) {
            return res.status(404).json({ error: 'Item no encontrado en el pedido' });
        }
        res.json(orderItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo ítem en un pedido
exports.createOrderItem = async (req, res) => {
    try {
        const { idorder, idproduct, quantity, price } = req.body;

        // Verificar que el pedido y el producto existen
        const order = await Order.findByPk(idorder);
        const product = await Product.findByPk(idproduct);

        if (!order || !product) {
            return res.status(404).json({ error: 'Pedido o Producto no encontrado' });
        }

        // Crear el ítem en el pedido
        const newOrderItem = await OrderItem.create({ idorder, idproduct, quantity, price });
        res.status(201).json(newOrderItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un ítem del pedido (por ejemplo, cambiar la cantidad o el precio)
exports.updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, price } = req.body;

        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) {
            return res.status(404).json({ error: 'Item no encontrado en el pedido' });
        }

        // Actualizar la cantidad y/o precio
        orderItem.quantity = quantity;
        orderItem.price = price;
        await orderItem.save();

        res.json(orderItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un ítem del pedido
exports.deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;

        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) {
            return res.status(404).json({ error: 'Item no encontrado en el pedido' });
        }

        await orderItem.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
