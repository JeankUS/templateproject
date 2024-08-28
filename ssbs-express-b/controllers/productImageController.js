const { ProductImage } = require('../models');

exports.getAllImages = async (req, res) => {
    try {
        const images = await ProductImage.findAll();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createImage = async (req, res) => {
    try {
        const newImage = await ProductImage.create(req.body);
        res.json(newImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ProductImage.destroy({ where: { idimage: id } });
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Imagen no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
