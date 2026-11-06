require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const projectRoutes = require('./routes/projectRoutes');

// Conecta ao banco de dados
connectDB();

const app = express();
app.use(express.json());

// Liga as rotas da nossa aplicação
app.use('/', projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});