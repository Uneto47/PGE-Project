const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const AdvogadosSchema = new mongoose.Schema({
  _id: { type: String },
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  oab: { type: String, require: true },
  senha: { type: String, require: true, select: false }
});

AdvogadosSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = uuidv4();
  }
  next();
});

const Advogados = mongoose.model('Advogados', AdvogadosSchema);

module.exports = Advogados;

//exemplos de advogados , senha de todos eles é 123: 
// [{ "nome": "Unaldo", "cpf": "473", "oab": "473" },
// { "nome": "miguel", "cpf": "3457", "oab": "12345" },
// { "nome": "Rafael", "cpf": "000", "oab": "145"}, 
// { "nome": "Eliza", "cpf": "345", "oab": "000"}]