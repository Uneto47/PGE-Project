const Advogados = require('../models/advogado');
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
  const {nome, cpf, senha } = req.body
  if(!nome){
    return res.status(422).json({ msg: 'O nome é obrigatório!' })
  }
  if(!cpf){
    return res.status(422).json({ msg: 'O cpf é obrigatório!' })
  }
  if(!senha){
    return res.status(422).json({ msg: 'A senha é obrigatória!' })
  }

  const user = await Advogados.findOne({cpf: cpf})

  if (user) {
     return res.status(422).json({msg: 'CPF já cadastrado'})
  }
  try {
    const advogados = {...req.body , senha: encrypt(req.body.senha)}
    const advogado = new Advogados(advogados);
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
const getById = async (req, res) => {
  try {

    const advogado = await Advogados.findById(req.params.id);

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

module.exports = { getById, get, remove, update, create };