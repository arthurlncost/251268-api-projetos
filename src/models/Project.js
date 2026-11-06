const mongoose = require('mongoose');

// Schema das Tarefas (Subdocumento)
const TaskSchema = new mongoose.Schema({
  codigo: { type: String, required: [true, 'O código da tarefa é obrigatório'] },
  nome: { type: String, required: [true, 'O nome da tarefa é obrigatório'] },
  responsavel: { type: String, required: [true, 'O responsável da tarefa é obrigatório'] }
});

// Schema do Projeto
const ProjectSchema = new mongoose.Schema({
  codigo: { type: String, required: [true, 'O código do projeto é obrigatório'], unique: true },
  nome: { type: String, required: [true, 'O nome do projeto é obrigatório'] },
  tarefas: {
    type: [TaskSchema],
    default: [],
    validate: {
      validator: function(tarefas) {
        // Regra: Um projeto não pode possuir tarefas com códigos repetidos.
        const codigos = tarefas.map(t => t.codigo);
        const codigosUnicos = new Set(codigos);
        return codigos.length === codigosUnicos.size;
      },
      message: 'Um projeto não pode possuir tarefas com códigos repetidos.'
    }
  }
});

module.exports = mongoose.model('Project', ProjectSchema);