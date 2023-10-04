const mongoose = require('mongoose');

const processoJudicialSchema = new mongoose.Schema({
  NumeroProcesso: { type: String, required: true },
  Parte: { type: mongoose.Schema.Types.ObjectId, ref: 'ClienteAdvogado' },
  Responsavel: { type: mongoose.Schema.Types.ObjectId, ref: 'ClienteAdvogado' },
  Documentos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Documento'}],
  Tema: String,
  ValorCausa: Number,
});

const ProcessoJudicial = mongoose.model('ProcessoJudicial', processoJudicialSchema);

module.exports = ProcessoJudicial;
