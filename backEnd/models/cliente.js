const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const clienteSchema = new mongoose.Schema({
  _id: {type: String, default: uuidv4()},
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
