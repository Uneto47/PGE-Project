const express = require('express');
const router = express.Router();
const advogadosController = require('../controller/AdvogadosController');

// Rotas CRUD para ClientesAdvogados
router.post('/', advogadosController.create);
router.get('/', advogadosController.get);
router.get('/:id', advogadosController.getByCpf);
router.put('/:id', advogadosController.update);
router.delete('/:id', advogadosController.remove);

module.exports = router;
