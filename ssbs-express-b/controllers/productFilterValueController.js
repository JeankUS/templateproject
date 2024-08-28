const { ProductFilterValue } = require('../models');

exports.getAllFilterValues = async (req, res) => {
    try {
        const filterValues = await ProductFilterValue.findAll();
        res.json(filterValues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFilterValueById = async (req, res) => {
    try {
        const id = req.params.id;
        const filterValue = await ProductFilterValue.findByPk(id);
        if (filterValue) {
            res.json(filterValue);
        } else {
            res.status(404).json({ error: "Valor de filtro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createFilterValue = async (req, res) => {
    try {
        const newFilterValue = await ProductFilterValue.create(req.body);
        res.json(newFilterValue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateFilterValue = async (req, res) => {
    try {
        const id = req.params.id;
        const [updated] = await ProductFilterValue.update(req.body, {
            where: { idfilter_value: id },
        });
        if (updated) {
            const updatedFilterValue = await ProductFilterValue.findByPk(id);
            res.json(updatedFilterValue);
        } else {
            res.status(404).json({ error: "Valor de filtro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteFilterValue = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ProductFilterValue.destroy({ where: { idfilter_value: id } });
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Valor de filtro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
