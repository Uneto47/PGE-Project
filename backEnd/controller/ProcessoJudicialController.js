const ProcessoJudicial = require('../models/processoJudicial');

// Create
exports.createProcessoJudicial = async (req, res) => {
  try {
    const processoJudicial = new ProcessoJudicial(req.body);
    await processoJudicial.save();
    res.status(201).json(processoJudicial);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar processo judicial' });
  }
};

// Read (List)
exports.listProcessosJudiciais = async (req, res) => {
  try {
    const processosJudiciais = await ProcessoJudicial.find().populate('Parte Responsavel Documentos');
    res.status(200).json(processosJudiciais);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar processos judiciais' });
  }
};

// Read (Detail)
exports.getProcessoJudicial = async (req, res) => {
  try {
    const numeroProcesso = req.params.numeroProcesso;

    const processoJudicial = await ProcessoJudicial.findOne({ NumeroProcesso: numeroProcesso }).populate('Parte Responsavel Documentos');

    if (!processoJudicial) {
      return res.status(404).json({ error: 'Processo judicial não encontrado' });
    }

    res.status(200).json(processoJudicial);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar processo judicial por número de processo' });
  }
};

// Update
// Atualizar um processo judicial pelo número de processo
exports.updateProcessoJudicial = async (req, res) => {
  try {
    const numeroProcesso = req.params.numeroProcesso;

    const processoJudicial = await ProcessoJudicial.findOneAndUpdate({ NumeroProcesso: numeroProcesso }, req.body, { new: true }).populate('Parte Responsavel Documentos');

    if (!processoJudicial) {
      return res.status(404).json({ error: 'Processo judicial não encontrado' });
    }

    res.status(200).json(processoJudicial);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar processo judicial por número de processo' });
  }
};


// Delete
// Excluir um processo judicial pelo número de processo
exports.deleteProcessoJudicial = async (req, res) => {
  try {
    const numeroProcesso = req.params.numeroProcesso;

    const processoJudicial = await ProcessoJudicial.findOneAndRemove({ NumeroProcesso: numeroProcesso });

    if (!processoJudicial) {
      return res.status(404).json({ error: 'Processo judicial não encontrado' });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir processo judicial por número de processo' });
  }
};

