const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const documentoSchema = new mongoose.Schema({
  _id: {type: String, default: uuidv4()},
  nome: { type: String, required: true },
  caminho: { type: String, required: true },
  extensao: { type: String, required: true },
});

const Documento = mongoose.model('Documento', documentoSchema);

module.exports = Documento;
