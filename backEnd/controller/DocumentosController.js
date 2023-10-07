const Documento = require('../models/documentos');

// Create
const create = async (req, res) => {
  const { nome } = req.body

  const documento = await Documento.findOne({ nome: nome })

  if (documento) {
     return res.status(422).json({msg: 'Esse nome já existe'})
  }

  try {
    const documento = new Documento(req.body);
    await documento.save();
    res.status(201).json(documento);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ msg });
  }
};

// Read (List)
const get = async (req, res) => {
  try {
    const documentos = await Documento.find();
    res.status(200).json(documentos);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao listar documentos' });
  }
};

const getByNome = async (req, res) => {
  try {
    const nome = req.params.nome
    const documentos = await Documento.find({ nome });
    res.status(200).json(documentos);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao listar documentos' });
  }
};

// Read (Detail)
const getById = async (req, res) => {
  try {
    const documento = await Documento.find(req.params.id);
    if (!documento) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }
    res.status(200).json(documento);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao obter documento' });
  }
};

// Update
const update = async (req, res) => {
  try {
    const documento = await Documento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!documento) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }
    res.status(200).json(documento);
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao atualizar documento' });
  }
};

// Delete
const remove = async (req, res) => {
  try {
    const documento = await Documento.findByIdAndRemove(req.params.id);
    if (!documento) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    const msg = error.message;
    console.error(msg)
    res.status(500).json({ error: 'Erro ao excluir documento' });
  }
};

module.exports = { get, getById, getByNome, remove, update, create }