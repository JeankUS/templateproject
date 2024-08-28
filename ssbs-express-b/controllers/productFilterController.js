const { ProductFilter } = require('../models');

// Obtener todos los filtros
exports.getAllFilters = async (req, res) => {
    try {
        const filters = await ProductFilter.findAll();
        res.json(filters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un filtro específico por ID
exports.getFilterById = async (req, res) => {
    try {
        const { id } = req.params;
        const filter = await ProductFilter.findByPk(id);
        if (!filter) {
            return res.status(404).json({ error: 'Filtro no encontrado' });
        }
        res.json(filter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo filtro
exports.createFilter = async (req, res) => {
    try {
        const newFilter = await ProductFilter.create(req.body);
        res.status(201).json(newFilter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un filtro existente
exports.updateFilter = async (req, res) => {
    try {
        const { id } = req.params;
        const filter = await ProductFilter.findByPk(id);
        if (!filter) {
            return res.status(404).json({ error: 'Filtro no encontrado' });
        }

        await filter.update(req.body);
        res.json(filter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un filtro
exports.deleteFilter = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ProductFilter.destroy({ where: { idfilter: id } });
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Filtro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
