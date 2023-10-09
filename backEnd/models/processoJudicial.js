const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const processoJudicialSchema = new mongoose.Schema({
  _id: { type: String },
  numeroprocesso: { type: String, required: true, unique: true },
  parte: { type: String, ref: 'Cliente' },
  responsavel: { type: String, ref: 'Advogado' },
  documentos: [{ type: String, ref: 'Documento' }],
  tema: String,
  valorcausa: Number,
});

processoJudicialSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = uuidv4();
  }
  next();
});

const ProcessoJudicial = mongoose.model('ProcessoJudicial', processoJudicialSchema);

module.exports = ProcessoJudicial;

//Exemplos de processos:
// [{
//   "numeroprocesso": "473853",
//   "parte": "123",
//   "responsavel": "473",
//   "documentos": [{ "nome": "Provas", "caminho": "C:\\Users\\User\\Downloads\\provas.pdf", "extensao": "PDF" },
//   { "nome": "Provas2", "caminho": "C:\\Users\\User\\Downloads\\provas.docx", "extensao": "Docx" },
//   { "nome": "Provas234", "caminho": "C:\\Users\\User\\Downloads\\provas.docx", "extensao": "Docx", }],
//   "tema": "plagio",
//   "valorcausa": 15000}, 
//   {"numeroprocesso": "47385355", 
//   "parte": "123", 
//   "responsavel": "473", 
//   "documentos": [{ "nome": "Provas", 
//   "caminho": "C:\\Users\\User\\Downloads\\provas.pdf", 
//   "extensao": "PDF"}], 
//   "tema": "Assedio", 
//   "valorcausa": 15000 }]