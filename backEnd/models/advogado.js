const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const AdvogadosSchema = new mongoose.Schema({
  _id: {type: String, default: uuidv4()},
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  oab: { type:String, require: true },
  senha: {type: String, require: true, select: false}
});

const Advogados = mongoose.model('Advogados', AdvogadosSchema);

module.exports = Advogados;
