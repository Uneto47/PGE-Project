const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const ClienteAdvogado = require('./models/clientesAdvogados');
const Person = require('./models/Person');
const ProcessoJudicial = require('./models/processoJudicial');
const Documento = require('./models/documentos');

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.post('/Person', async (req, res)=>{
  const { name, salary, approved} = req.body

  if (!name) {
    res.status(422).json({error: 'O nome é obrigatório'})
  }

  const person = {
    name,
    salary,
    approved
  }
  try {

    await Person.create(person)
    res.status(201).json({message: 'Person inserida com sucesso!'}) 

  } catch(error) {
    res.status(500).json({error: error})
  }
})

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