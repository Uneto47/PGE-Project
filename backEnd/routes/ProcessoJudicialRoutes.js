const express = require('express');
const router = express.Router();
const processoJudicialController = require('../controller/ProcessoJudicialController');

// Rotas CRUD para ProcessoJudicial
router.post('/', processoJudicialController.create);
router.get('/', processoJudicialController.get);
router.get('/:id', processoJudicialController.getByNumero);
router.put('/:id', processoJudicialController.update);
router.delete('/:id', processoJudicialController.remove);

module.exports = router;
