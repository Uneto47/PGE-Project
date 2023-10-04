const express = require('express');
const router = express.Router();
const documentoController = require('../controller/DocumentosController');

// Rotas CRUD para Documento
router.post('/', documentoController.create);
router.get('/', documentoController.get);
router.get('/:id', documentoController.getById);
router.put('/:id', documentoController.update);
router.delete('/:id', documentoController.remove);

module.exports = router;
