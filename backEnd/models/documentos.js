const mongoose = require('mongoose');

const documentoSchema = new mongoose.Schema({
  Nome: { type: String, required: true },
  Caminho: { type: String, required: true },
  Extensao: { type: String, required: true },
});

const Documento = mongoose.model('Documento', documentoSchema);

module.exports = Documento;
