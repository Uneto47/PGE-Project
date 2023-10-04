const Documento = require('../models/documentos');

// Create
const create = async (req, res) => {
  try {
    const documento = new Documento(req.body);
    await documento.save();
    res.status(201).json(documento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar documento' });
  }
};

// Read (List)
const get = async (req, res) => {
  try {
    const documentos = await Documento.find();
    res.status(200).json(documentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar documentos' });
  }
};

// Read (Detail)
const getById = async (req, res) => {
  try {
    const documento = await Documento.findById(req.params.id);
    if (!documento) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }
    res.status(200).json(documento);
  } catch (error) {
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
    res.status(500).json({ error: 'Erro ao excluir documento' });
  }
};

module.exports = { get, getById, remove, update, create }