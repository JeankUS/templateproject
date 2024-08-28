const { CartItem, Product, Cart } = require('../models');

// Obtener todos los ítems de todos los carritos (no suele ser común, pero útil para depuración)
exports.getAllCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.findAll({
            include: [Product, Cart]
        });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener ítems de un carrito específico
exports.getItemsByCartId = async (req, res) => {
    try {
        const { idcart } = req.params;
        const cartItems = await CartItem.findAll({
            where: { idcart },
            include: [Product]
        });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un ítem específico de un carrito
exports.getCartItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await CartItem.findByPk(id, {
            include: [Product, Cart]
        });
        if (!cartItem) {
            return res.status(404).json({ error: 'Item no encontrado en el carrito' });
        }
        res.json(cartItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo ítem en un carrito
exports.createCartItem = async (req, res) => {
    try {
        const { idcart, idproduct, quantity } = req.body;

        // Verificar que el carrito y el producto existen
        const cart = await Cart.findByPk(idcart);
        const product = await Product.findByPk(idproduct);

        if (!cart || !product) {
            return res.status(404).json({ error: 'Carrito o Producto no encontrado' });
        }

        // Crear el ítem en el carrito
        const newCartItem = await CartItem.create({ idcart, idproduct, quantity });
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un ítem del carrito (por ejemplo, cambiar la cantidad)
exports.updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await CartItem.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({ error: 'Item no encontrado en el carrito' });
        }

        // Actualizar la cantidad
        cartItem.quantity = quantity;
        await cartItem.save();

        res.json(cartItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un ítem del carrito
exports.deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        const cartItem = await CartItem.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({ error: 'Item no encontrado en el carrito' });
        }

        await cartItem.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
