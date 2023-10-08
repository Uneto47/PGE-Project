const express = require('express');
const router = express.Router();
const documentoController = require('../controller/DocumentosController');

// Rotas CRUD para Documento
router.post('/', documentoController.create);
router.get('/', documentoController.get);
router.get('/nome/:nome', documentoController.getByNome);

module.exports = router;
