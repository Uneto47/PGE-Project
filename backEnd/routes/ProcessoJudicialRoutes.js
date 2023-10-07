const express = require('express');
const router = express.Router();
const processoJudicialController = require('../controller/ProcessoJudicialController');

// Rotas CRUD para ProcessoJudicial
router.post('/', processoJudicialController.create);
router.get('/', processoJudicialController.get);
router.get('/processo/:numero', processoJudicialController.getByNumero);
router.get('/processo/cliente/:cpf', processoJudicialController.getByParte);
router.get('/processo/advogado/:cpf', processoJudicialController.getByResponsavel);
router.get('/processo/cliente/id/:id', processoJudicialController.getById);
router.get('/processo/advogado/id/:id', processoJudicialController.getById);
router.put('/update/:numero', processoJudicialController.update);
router.delete('/delete/:numero', processoJudicialController.remove);

module.exports = router;
 