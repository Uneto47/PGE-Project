const Clientes = require('../models/cliente');

// Create
const create = async (req, res) => {
  try {
    const cliente = new Clientes(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    const msg = error.message;
    console.error(msg);
    res.status(500).json({ error: 'Erro ao criar cliente ou advogado' });
  }
};

// Read (List)
const get = async (req, res) => {
  try {
    const cliente = await Clientes.find();
    res.status(200).json(cliente);
  } catch (error) {
    const msg = error.message;
    console.error(msg);
    res.status(500).json({ error: 'Erro ao listar clientes ou advogados' });
  }
};

// Read (Detail)
const getByCpf = async (req, res) => {
  try {
    const cpf = req.params.cpf;

    const cliente = await Clientes.findOne({ CPF: cpf });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente ou advogado não encontrado' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    const msg = error.message;
    console.error(msg);
    res.status(500).json({ error: 'Erro ao obter cliente ou advogado por CPF' });
  }
};


// Update
const update = async (req, res) => {
  try {
    const cpf = req.params.cpf;

    const cliente = await Clientes.findOneAndUpdate({ CPF: cpf }, req.body, { new: true });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente ou advogado não encontrado' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    const msg = error.message;
    console.error(msg);
    res.status(500).json({ error: 'Erro ao atualizar cliente ou advogado por CPF' });
  }
};


// Delete
const remove = async (req, res) => {
  try {
    const cpf = req.params.cpf;

    const cliente = await Clientes.findOneAndRemove({ CPF: cpf });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente ou advogado não encontrado' });
    }

    res.status(204).end();
  } catch (error) {
    const msg = error.message;
    console.error(msg);
    res.status(500).json({ error: 'Erro ao excluir cliente ou advogado por CPF' });
  }
};

module.exports = { getByCpf, get, remove, update, create};