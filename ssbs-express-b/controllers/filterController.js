const Filter = require('../models/ProductFilter');
const FilterValue = require('../models/ProductFilterValue');

exports.getAllFilters = async (req, res) => {
  try {
    const filters = await Filter.findAll();
    res.json(filters);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving filters' });
  }
};

exports.createFilter = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newFilter = await Filter.create({
      name,
      description,
    });
    res.status(201).json(newFilter);
  } catch (error) {
    res.status(500).json({ error: 'Error creating filter' });
  }
};

exports.createFilterValue = async (req, res) => {
  const { idproduct, idfilter, value } = req.body;
  try {
    const newFilterValue = await FilterValue.create({
      idproduct,
      idfilter,
      value,
    });
    res.status(201).json(newFilterValue);
  } catch (error) {
    res.status(500).json({ error: 'Error creating filter value' });
  }
};

// Add update and delete methods similarly
