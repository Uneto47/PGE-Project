const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const processoJudicialSchema = new mongoose.Schema({
  _id: {type: String, default: uuidv4()},
  numeroprocesso: { type: String, required: true, unique: true },
  parte: { type: String, ref: 'Cliente' },
  responsavel: { type: String, ref: 'Advogado' },
  documentos: [{ type: String, ref: 'Documento'}],
  tema: String,
  valorcausa: Number,
});

const ProcessoJudicial = mongoose.model('ProcessoJudicial', processoJudicialSchema);

module.exports = ProcessoJudicial;
