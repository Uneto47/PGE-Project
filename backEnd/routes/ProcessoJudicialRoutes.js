const express = require('express');
const router = express.Router();
const processoJudicialController = require('../controller/ProcessoJudicialController');

// Rotas CRUD para ProcessoJudicial
router.post('/', processoJudicialController.createProcessoJudicial);
router.get('/', processoJudicialController.listProcessosJudiciais);
router.get('/:id', processoJudicialController.getProcessoJudicial);
router.put('/:id', processoJudicialController.updateProcessoJudicial);
router.delete('/:id', processoJudicialController.deleteProcessoJudicial);

module.exports = router;
