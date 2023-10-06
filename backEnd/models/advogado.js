const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const AdvogadosSchema = new mongoose.Schema({
  _id: { type: String },
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  oab: { type:String, require: true },
  senha: {type: String, require: true, select: false}
});

AdvogadosSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = uuidv4();
  }
  next();
});

const Advogados = mongoose.model('Advogados', AdvogadosSchema);

module.exports = Advogados;
