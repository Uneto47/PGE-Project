const ProcessoJudicial = require('../models/processoJudicial');

// Create
const create = async (req, res) => {
  try {
    const processoJudicial = new ProcessoJudicial(req.body);
    await processoJudicial.save();
    res.status(201).json(processoJudicial);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao criar processo judicial' });
  }
};

// Read (List)
const get = async (req, res) => {
  try {
    const processosJudiciais = await ProcessoJudicial.find().populate({ path: "documentos" });
    res.status(200).json(processosJudiciais);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao listar processos judiciais' });
  }
};

// Read (Detail)
const getByNumero = async (req, res) => {
  try {
    const numeroProcesso = req.params.numeroProcesso;

    const processoJudicial = await ProcessoJudicial.findOne({ NumeroProcesso: numeroProcesso }).populate({ path: "documentos" });

    if (!processoJudicial) {
      return res.status(404).json({ error: 'Processo judicial não encontrado' });
    }

    res.status(200).json(processoJudicial);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao buscar processo judicial por número de processo' });
  }
};

const getByParte = async (req, res) => {
  try {
    const parte = req.params.cpf;

    const processoJudicial = await ProcessoJudicial.find({ parte }).populate({ path: "documentos" });

    if (!processoJudicial) {
      return res.status(404).json({ error: 'Processo judicial não encontrado' });
    }

    res.status(200).json(processoJudicial);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao buscar processo judicial por número de processo' });
  }
};

const getById = async (req, res) => {
  try {
    const _id = req.params.id;

    const processoJudicial = await ProcessoJudicial.find({ _id }).populate({ path: "documentos" });

    if (!processoJudicial) {
      return res.status(404).json({ error: 'Processo judicial não encontrado' });
    }
 
    res.status(200).json(processoJudicial);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao buscar processo judicial por número de processo' });
  }
};

const getByResponsavel = async (req, res) => {
  try {
    const responsavel = req.params.cpf;

    const processoJudicial = await ProcessoJudicial.findOne({ responsavel }).populate({ path: "documentos" });;

    if (!processoJudicial) {
      return res.status(404).json({ error: 'Processo judicial não encontrado' });
    }

    res.status(200).json(processoJudicial);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao buscar processo judicial por número de processo' });
  }
};

// Update
// Atualizar um processo judicial pelo número de processo
const update = async (req, res) => {
  try {
    const numeroProcesso = req.params.numeroProcesso;

    const processoJudicial = await ProcessoJudicial.findOneAndUpdate({ NumeroProcesso: numeroProcesso }, req.body, { new: true }).populate({ path: "documentos" });;

    if (!processoJudicial) {
      return res.status(404).json({ error: 'Processo judicial não encontrado' });
    }

    res.status(200).json(processoJudicial);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao atualizar processo judicial por número de processo' });
  }
};


// Delete
// Excluir um processo judicial pelo número de processo
const remove = async (req, res) => {
  try {
    const numeroProcesso = req.params.numeroProcesso;

    const processoJudicial = await ProcessoJudicial.findOneAndRemove({ NumeroProcesso: numeroProcesso });

    if (!processoJudicial) {
      return res.status(404).json({ error: 'Processo judicial não encontrado' });
    }

    res.status(204).end();
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao excluir processo judicial por número de processo' });
  }
};

module.exports = { get, getByNumero, getByParte, getById, getByResponsavel, remove, update, create}