const express = require('express');
const router = express.Router();
const processoJudicialController = require('../controller/ProcessoJudicialController');

// Rotas CRUD para ProcessoJudicial
router.post('/', processoJudicialController.create);
router.get('/', processoJudicialController.get);
router.get('/:idnumero', processoJudicialController.getByNumero);
router.get('/processo/cliente/:idCliente', processoJudicialController.getByParte);
router.get('/processo/advogado/:idAdvogado', processoJudicialController.getByResponsavel);
router.put('/:id', processoJudicialController.update);
router.delete('/:id', processoJudicialController.remove);

module.exports = router;
