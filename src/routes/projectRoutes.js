const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');

// Define os endpoints da Parte 1
router.get('/projetos', ProjectController.listarProjetos);
router.get('/projetos/:codigo', ProjectController.buscarPorCodigo);
router.get('/projetos/:codigo/tarefas', ProjectController.listarTarefas);
router.get('/projetos/:codigo/resumo', ProjectController.resumoProjeto);
router.post('/projetos', ProjectController.criarProjeto);
router.put('/projetos/:codigo', ProjectController.atualizarProjeto);
router.delete('/projetos/:codigo', ProjectController.deletarProjeto);
router.post('/projetos/:codigo/tarefas', ProjectController.adicionarTarefa);
router.put('/projetos/:codigo/tarefas/:codigoTarefa', ProjectController.atualizarTarefa);
router.delete('/projetos/:codigo/tarefas/:codigoTarefa', ProjectController.deletarTarefa);

module.exports = router;