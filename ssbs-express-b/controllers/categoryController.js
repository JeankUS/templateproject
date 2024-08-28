const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving categories' });
  }
};

exports.createCategory = async (req, res) => {
  const { name, description, created_by } = req.body;
  try {
    const newCategory = await Category.create({
      name,
      description,
      created_by,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
};

// Add update and delete methods similarly
