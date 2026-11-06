require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./src/models/Project');

const projetosIniciais = [
  {
    codigo: "PRJ001",
    nome: "Desenvolvimento de Site",
    tarefas: [
      { codigo: "TAR101", nome: "Criar layout", responsavel: "Ana" },
      { codigo: "TAR102", nome: "Desenvolver API", responsavel: "Carlos" }
    ]
  },
  {
    codigo: "PRJ002",
    nome: "Migração de Servidor",
    tarefas: [
      { codigo: "TAR201", nome: "Backup dos dados", responsavel: "Marcos" },
      { codigo: "TAR202", nome: "Configuração da AWS", responsavel: "Ana" }
    ]
  },
  {
    codigo: "PRJ003",
    nome: "Aplicativo Mobile",
    tarefas: [
      { codigo: "TAR301", nome: "Prototipagem no Figma", responsavel: "Beatriz" },
      { codigo: "TAR302", nome: "Desenvolvimento Frontend", responsavel: "Carlos" },
      { codigo: "TAR303", nome: "Publicação nas Lojas", responsavel: "Beatriz" }
    ]
  }
];

const popularBanco = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB para inserção...');
    
    // Limpa a coleção para evitar erros de duplicação caso rode o script mais de uma vez
    await Project.deleteMany({});
    
    // Insere os 3 projetos
    await Project.insertMany(projetosIniciais);
    console.log('3 projetos iniciais inseridos com sucesso!');
    
    process.exit();
  } catch (error) {
    console.error('Erro ao popular o banco:', error);
    process.exit(1);
  }
};

popularBanco();