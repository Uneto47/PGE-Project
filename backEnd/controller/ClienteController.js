const Clientes = require('../models/cliente');
const bcrypt = require("bcrypt");

function encrypt(passowrd) {
  try {
    const saltRound = 10
    return bcrypt.hashSync(passowrd, saltRound)
  } catch (err) {
    console.log(err)
  }}

// Create
const create = async (req, res) => {
  const user = await Clientes.findOne({cpf: cpf})

  if (user) {
     return res.status(422).json({msg: 'CPF já cadastrado'})
  }

  try {
    const clientes = {...req.body , senha: encrypt(req.body.senha)}
    const cliente = new Clientes(clientes);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    const msg = error.message;
    console.error(msg);
    res.status(500).json({ error: 'Erro ao criar cliente' });
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
const getById = async (req, res) => {
  try {
    const _id = req.params.id
    const cliente = await Clientes.findOne({_id});

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

const getByCpf = async (req, res) => {
  try {
    const cpf = req.params.cpf;

    const cliente = await Clientes.findOne({cpf});

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

module.exports = { getById, get, getByCpf, remove, update, create};