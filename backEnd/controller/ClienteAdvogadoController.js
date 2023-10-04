const ClientesAdvogados = require('../models/clientesAdvogados');

// Create
exports.create = async (req, res) => {
  console.log(req.body)
  try {
    const clientesAdvogados = new ClientesAdvogados(req.body);
    await clientesAdvogados.save();
    res.status(201).json(clientesAdvogados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente ou advogado' });
  }
};

// Read (List)
exports.get = async (req, res) => {
  try {
    const clientesAdvogados = await ClientesAdvogados.find();
    res.status(200).json(clientesAdvogados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar clientes ou advogados' });
  }
};

// Read (Detail)
exports.getByCpf = async (req, res) => {
  try {
    const cpf = req.params.cpf;

    const clienteAdvogado = await ClientesAdvogados.findOne({ CPF: cpf });

    if (!clienteAdvogado) {
      return res.status(404).json({ error: 'Cliente ou advogado não encontrado' });
    }

    res.status(200).json(clienteAdvogado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter cliente ou advogado por CPF' });
  }
};


// Update
exports.update = async (req, res) => {
  try {
    const cpf = req.params.cpf;

    const clienteAdvogado = await ClientesAdvogados.findOneAndUpdate({ CPF: cpf }, req.body, { new: true });

    if (!clienteAdvogado) {
      return res.status(404).json({ error: 'Cliente ou advogado não encontrado' });
    }

    res.status(200).json(clienteAdvogado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cliente ou advogado por CPF' });
  }
};


// Delete
exports.delete = async (req, res) => {
  try {
    const cpf = req.params.cpf;

    const clienteAdvogado = await ClientesAdvogados.findOneAndRemove({ CPF: cpf });

    if (!clienteAdvogado) {
      return res.status(404).json({ error: 'Cliente ou advogado não encontrado' });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir cliente ou advogado por CPF' });
  }
};