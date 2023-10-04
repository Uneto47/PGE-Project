const express = require('express');
const router = express.Router();
const clientesAdvogadosController = require('../controller/ClienteAdvogadoController');

// Rotas CRUD para ClientesAdvogados
router.post('/', clientesAdvogadosController.create);
router.get('/', clientesAdvogadosController.get);
router.get('/:id', clientesAdvogadosController.getByCpf);
router.put('/:id', clientesAdvogadosController.update);
router.delete('/:id', clientesAdvogadosController.delete);

module.exports = router;
