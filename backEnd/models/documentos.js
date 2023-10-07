const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const documentoSchema = new mongoose.Schema({
  _id: { type: String },
  nome: { type: String, required: true, unique: true },
  caminho: { type: String, required: true },
  extensao: { type: String, required: true },
});

documentoSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = uuidv4();
  }
  next();
});

const Documento = mongoose.model('Documento', documentoSchema);

module.exports = Documento;
