const mongoose = require('mongoose');

const clienteAdvogadoSchema = new mongoose.Schema({
  Nome: { type: String, required: true },
  CPF: { type: String, unique: true, required: true },
  OAB: String,
});

const ClienteAdvogado = mongoose.model('ClienteAdvogado', clienteAdvogadoSchema);

module.exports = ClienteAdvogado;
