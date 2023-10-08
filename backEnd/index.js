const express = require('express')
const mongoose = require('mongoose')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const cors = require('cors')
require('dotenv').config()

const app = express()
const processoJudicialRoutes = require('./routes/ProcessoJudicialRoutes');
const documentosRoutes = require('./routes/DocumentosRoutes');
const advogadosRoutes = require('./routes/AdvogadosRoutes');
const clientesRoutes = require('./routes/ClientesRoutes');
const authRoutes = require('./routes/AuthRoutes');

app.use(
  cors(),
  express.json(),
  express.urlencoded({
    extended: true,
  }),
)

app.use('/processos-judiciais', processoJudicialRoutes);
app.use('/documento', documentosRoutes);
app.use('/cliente', clientesRoutes);
app.use('/advogado', advogadosRoutes);
app.use('/auth', authRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.qf9pkh3.mongodb.net/?retryWrites=true&w=majority`
    )
  .then(()=>{
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
  })
  .catch((err)=>console.log(err))