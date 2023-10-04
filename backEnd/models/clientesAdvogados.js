const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const clientesAdvogadosSchema = new mongoose.Schema({
  id: {type: String, default: uuidv4()},
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  tipo: { type: String, enum: ['cliente', 'advogado'], required: true },
  oab: {
    type: String,
    unique: true,
    required: function() {
      return this.tipo === 'advogado';
    },
  },
});

const ClientesAdvogados = mongoose.model('ClientesAdvogados', clientesAdvogadosSchema);

module.exports = ClientesAdvogados;
