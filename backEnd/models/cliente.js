const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const clienteSchema = new mongoose.Schema({
  _id: { type: String },
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  senha: { type: String, required: true, select: false }
});

clienteSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = uuidv4();
  }
  next();
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;

//exemplos de clientes , senha de todos eles é 123: 
// [{ "nome": "Neto", "cpf": "374" },
// { "nome": "Oten", "cpf": "123" },
// { "Victor", "cpf": "38965" }]