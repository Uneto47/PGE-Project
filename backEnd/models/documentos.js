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

// Exemplos de documentos que estão no banco:
// ["nome":"Provas","caminho":"C:\\Users\\User\\Downloads\\provas.pdf","extensao":"PDF"},
// {"nome":"Provas2","caminho":"C:\\Users\\User\\Downloads\\provas.docx","extensao":"Docx"},
// "nome":"Detalhes5","caminho":"C:\\Users\\User\\Downloads\\detalhes5.pdf","extensao":"PDF"}]