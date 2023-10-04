const mongoose = require('mongoose');

const processoJudicialSchema = new mongoose.Schema({
  numeroprocesso: { type: String, required: true, unique: true },
  parte: { type: mongoose.Schema.Types.ObjectId, ref: 'ClienteAdvogado' },
  responsavel: { type: mongoose.Schema.Types.ObjectId, ref: 'ClienteAdvogado' },
  documentos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Documento'}],
  tema: String,
  valorcausa: Number,
});

const ProcessoJudicial = mongoose.model('ProcessoJudicial', processoJudicialSchema);

module.exports = ProcessoJudicial;
