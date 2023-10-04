const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const processoJudicialRoutes = require('./routes/ProcessoJudicialRoutes');
const documentosRoutes = require('./routes/DocumentosRoutes');
const advogadosRoutes = require('./routes/AdvogadosRoutes');
const clientesRoutes = require('./routes/ClientesRoutes');


app.use(
  express.json(),
  express.urlencoded({
    extended: true,
  }),
)

app.use('/processos-judiciais', processoJudicialRoutes);
app.use('/documentos', documentosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/advogados', advogadosRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.qf9pkh3.mongodb.net/?retryWrites=true&w=majority`
    )
  .then(()=>{
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
  })
  .catch((err)=>console.log(err))