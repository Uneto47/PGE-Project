const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

// const ClienteAdvogado = require('./ClienteAdvogado');
// const ProcessoJudicial = require('./ProcessoJudicial');
// const Documento = require('./Documento');

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.get('/', (req, res) =>{
  res.json({message: "Oi express!" })
} )

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.qf9pkh3.mongodb.net/?retryWrites=true&w=majority`
    )
  .then(()=>{
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
  })
  .catch((err)=>console.log(err))