const Advogados = require('../models/advogado');

// Create
const create = async (req, res) => {
  try {
    const advogado = new Advogados(req.body);
    await advogado.save();
    res.status(201).json(advogado);
  } catch (error) {
    const msg = error.message;
    res.status(500).json( msg );
  }
};

// Read (List)
const get = async (req, res) => {
  try {
    const advogado = await Advogados.find();
    res.status(200).json(advogado);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao listar clientes ou advogados' });
  }
};

// Read (Detail)
const getByCpf = async (req, res) => {
  try {
    const cpf = req.params.cpf;

    const advogado = await Advogados.findOne({ CPF: cpf });

    if (!advogado) {
      return res.status(404).json({ error: 'Cliente ou advogado não encontrado' });
    }

    res.status(200).json(advogado);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao obter cliente ou advogado por CPF' });
  }
};


// Update
const update = async (req, res) => {
  try {
    const cpf = req.params.cpf;

    const advogado = await Advogados.findOneAndUpdate({ CPF: cpf }, req.body, { new: true });

    if (!advogado) {
      return res.status(404).json({ error: 'Cliente ou advogado não encontrado' });
    }

    res.status(200).json(advogado);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao atualizar cliente ou advogado por CPF' });
  }
};


// Delete
const remove = async (req, res) => {
  try {
    const cpf = req.params.cpf;

    const advogado = await Advogados.findOneAndRemove({ CPF: cpf });

    if (!advogado) {
      return res.status(404).json({ error: 'Cliente ou advogado não encontrado' });
    }

    res.status(204).end();
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao excluir cliente ou advogado por CPF' });
  }
};

module.exports = { getByCpf, get, remove, update, create };