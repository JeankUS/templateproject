const { Product, ProductImage } = require('../models');


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductImage,
          as: 'images',
          attributes: ['url'], // Solo obtén la URL de las imágenes
        }
      ]
    });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error retrieving products' });
  }
};


exports.createProduct = async (req, res) => {
  const { name, description, price, stock, idcategory, created_by } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      idcategory,
      created_by,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Add update and delete methods similarly
