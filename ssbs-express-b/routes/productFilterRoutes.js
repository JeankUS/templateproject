const express = require('express');
const router = express.Router();
const productFilterController = require('../controllers/productFilterController');

router.get('/', productFilterController.getAllFilters); // Obtener todos los filtros
router.get('/:id', productFilterController.getFilterById); // Obtener un filtro por ID
router.post('/', productFilterController.createFilter); // Crear un nuevo filtro
router.put('/:id', productFilterController.updateFilter); // Actualizar un filtro existente
router.delete('/:id', productFilterController.deleteFilter); // Eliminar un filtro

module.exports = router;
