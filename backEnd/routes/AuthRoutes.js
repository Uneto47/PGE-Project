const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cliente = require('../models/cliente');
const Advogado = require('../models/advogado');

const  fazerAutenticacao = async ( usuario, senha, res) => {
  const senhaCorrespondente = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorrespondente) return res.status(404).json({ error: 'Usuário ou Senha inválido' })
  
  const { _id } = usuario
  const token = jwt.sign({ _id }, process.env.DB_PASSWORD, { expiresIn: "1 day" })
  res.send({ auth: true, token: token })

}

router.post('/login/clientes', async (req, res) => {
  const { cpf, senha } = req.body
  try {
    const cliente = await Cliente.findOne({ cpf }).select('+senha')
    
    if (!cliente) return res.status(404).json({ error: 'Usuário ou Senha inválido' })

    await fazerAutenticacao(cliente, senha, res)
   
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }
});

router.post('/login/advogados', async (req, res) => {
  const { cpf, senha } = req.body
  try {
    const advogado = await Advogado.findOne({ cpf }).select('+senha')
    
    if (!advogado) return res.status(404).json({ error: 'Usuário ou Senha inválido' });

   await fazerAutenticacao(advogado, senha, res)
      
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }
});

module.exports = router;
