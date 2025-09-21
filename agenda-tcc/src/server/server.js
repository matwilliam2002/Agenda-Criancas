const express = require('express');
const sequelize = require('..//database/db'); // ajuste o caminho conforme seu projeto
const app = express();
const cors = require('cors');

const userRouter = require('./routes/user.routes');
const premioRouter = require('./routes/premio.routes');
const tarefaRouter = require('./routes/tarefa.routes');
const tarefaFilhoRouter = require('../server/routes/tarefaFilho.routes')

app.use(cors({ origin: 'http://localhost:3001' })); // permite só do frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRouter);
app.use('/api/premios', premioRouter);
app.use('/api/tarefas', tarefaRouter);
app.use('/api/tarefaFilho', tarefaFilhoRouter); 

app.listen(3000, () =>{
    console.log("Servidor rodando na porta 3000");
});

sequelize.sync({})
  .then(() => {
    console.log("📦 Tabelas sincronizadas com o banco de dados!");
  })
  .catch((err) => {
    console.error("❌ Erro ao sincronizar com o banco:", err);
  });

