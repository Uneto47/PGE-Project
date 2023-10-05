const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cliente = require('../models/cliente');

router.post('/login', async (req, res) => {
  const { cpf, senha } = req.body
  try {
    const cliente = await Cliente.findOne({ cpf }).select('+senha')

    if (!cliente) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaCorrespondente = await bcrypt.compare(senha, cliente.senha);

    if (!senhaCorrespondente) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const { _id } = cliente
    const token = jwt.sign({ _id }, process.env.DB_PASSWORD, { expiresIn: "1 day" })
    res.send({ auth: true, token: token })

  } catch (err) {
    return res.status(401).send(err.message)
  }
});

module.exports = router;