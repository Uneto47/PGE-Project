const express = require('express');
const router = express.Router();
const clientesController = require('../controller/ClienteController');

// Rotas CRUD para ClientesAdvogados
router.post('/', clientesController.create);
router.get('/', clientesController.get);
router.get('/:id', clientesController.getById);
router.put('/:id', clientesController.update);
router.delete('/:id', clientesController.remove);

module.exports = router;
