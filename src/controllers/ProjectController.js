const Project = require('../models/Project');

module.exports = {
  // 1. GET /projetos e 4. GET /projetos?nome=Site
  async listarProjetos(req, res) {
    try {
      const { nome } = req.query;
      let filtro = {};

      // Se o usuário passar ?nome= no Postman, filtra parcialmente ignorando maiúsculas (regex 'i')
      if (nome) {
        filtro.nome = { $regex: nome, $options: 'i' };
      }

      const projetos = await Project.find(filtro);
      return res.status(200).json(projetos);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno ao buscar projetos.' });
    }
  },

  // 2. GET /projetos/:codigo
  async buscarPorCodigo(req, res) {
    try {
      const { codigo } = req.params;
      const projeto = await Project.findOne({ codigo });

      if (!projeto) {
        return res.status(404).json({ erro: 'Projeto não encontrado' });
      }

      return res.status(200).json(projeto);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno ao buscar o projeto.' });
    }
  },

  // 3. GET /projetos/:codigo/tarefas
  async listarTarefas(req, res) {
    try {
      const { codigo } = req.params;
      const projeto = await Project.findOne({ codigo });

      if (!projeto) {
        return res.status(404).json({ erro: 'Projeto não encontrado' });
      }

      return res.status(200).json(projeto.tarefas);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno ao buscar tarefas.' });
    }
  },

    // 1. GET /projetos, 4. GET /projetos?nome=Site e 11. GET /projetos?tarefa=TAR101
  async listarProjetos(req, res) {
    try {
      const { nome, tarefa } = req.query;
      let filtro = {};

      if (nome) {
        filtro.nome = { $regex: nome, $options: 'i' };
      }

      // Se o utilizador passar ?tarefa= no Postman, procura dentro do array de tarefas
      if (tarefa) {
        filtro['tarefas.codigo'] = tarefa;
      }

      const projetos = await Project.find(filtro);
      return res.status(200).json(projetos);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno ao buscar projetos.' });
    }
  },

  // 5. POST /projetos
  async criarProjeto(req, res) {
    try {
      const { codigo, nome, tarefas } = req.body;
      
      // Verifica se o código já existe (evita duplicação)
      const projetoExiste = await Project.findOne({ codigo });
      if (projetoExiste) {
        return res.status(409).json({ erro: 'Já existe um projeto com este código.' });
      }

      const novoProjeto = await Project.create({ codigo, nome, tarefas });
      return res.status(201).json(novoProjeto); // 201 significa "Criado"
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  // 6. PUT /projetos/:codigo
  async atualizarProjeto(req, res) {
    try {
      const { codigo } = req.params;
      const { nome } = req.body;

      // O { new: true } garante que o Mongoose devolve o projeto já atualizado
      const projetoAtualizado = await Project.findOneAndUpdate(
        { codigo },
        { nome },
        { new: true, runValidators: true }
      );

      if (!projetoAtualizado) {
        return res.status(404).json({ erro: 'Projeto não encontrado' });
      }

      return res.status(200).json(projetoAtualizado);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  // 7. DELETE /projetos/:codigo
  async deletarProjeto(req, res) {
    try {
      const { codigo } = req.params;
      
      const projetoDeletado = await Project.findOneAndDelete({ codigo });

      if (!projetoDeletado) {
        return res.status(404).json({ erro: 'Projeto não encontrado' });
      }

      return res.status(200).json({ mensagem: 'Projeto deletado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno ao deletar o projeto.' });
    }
  },

  // 8. POST /projetos/:codigo/tarefas
  async adicionarTarefa(req, res) {
    try {
      const { codigo } = req.params;
      const novaTarefa = req.body;

      const projeto = await Project.findOne({ codigo });
      if (!projeto) {
        return res.status(404).json({ erro: 'Projeto não encontrado' });
      }

      // Verifica se já existe uma tarefa com este código dentro do projeto
      const tarefaExiste = projeto.tarefas.find(t => t.codigo === novaTarefa.codigo);
      if (tarefaExiste) {
        return res.status(409).json({ erro: 'Já existe uma tarefa com este código neste projeto.' });
      }

      projeto.tarefas.push(novaTarefa);
      await projeto.save();

      return res.status(201).json(projeto);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  // 9. PUT /projetos/:codigo/tarefas/:codigoTarefa
  async atualizarTarefa(req, res) {
    try {
      const { codigo, codigoTarefa } = req.params;
      const { nome, responsavel } = req.body;

      const projeto = await Project.findOne({ codigo });
      if (!projeto) {
        return res.status(404).json({ erro: 'Projeto não encontrado' });
      }

      const tarefa = projeto.tarefas.find(t => t.codigo === codigoTarefa);
      if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
      }

      // Atualiza apenas os campos que foram enviados
      if (nome) tarefa.nome = nome;
      if (responsavel) tarefa.responsavel = responsavel;
      
      await projeto.save();
      return res.status(200).json(projeto);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  // 10. DELETE /projetos/:codigo/tarefas/:codigoTarefa
  async deletarTarefa(req, res) {
    try {
      const { codigo, codigoTarefa } = req.params;

      const projeto = await Project.findOne({ codigo });
      if (!projeto) {
        return res.status(404).json({ erro: 'Projeto não encontrado' });
      }

      const totalTarefasAntes = projeto.tarefas.length;
      
      // Filtra as tarefas, mantendo todas exceto aquela que queremos apagar
      projeto.tarefas = projeto.tarefas.filter(t => t.codigo !== codigoTarefa);

      // Se o total não mudou, é porque a tarefa não existia
      if (projeto.tarefas.length === totalTarefasAntes) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
      }

      await projeto.save();
      return res.status(200).json({ mensagem: 'Tarefa deletada com sucesso!' });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno ao deletar a tarefa.' });
    }
  },

  // 12. GET /projetos/:codigo/resumo
  async resumoProjeto(req, res) {
    try {
      const { codigo } = req.params;
      const projeto = await Project.findOne({ codigo });

      if (!projeto) {
        return res.status(404).json({ erro: 'Projeto não encontrado' });
      }

      const totalTarefas = projeto.tarefas.length;
      
      // Mapeia todos os responsáveis e usa o Set para remover nomes duplicados
      const responsaveis = [...new Set(projeto.tarefas.map(t => t.responsavel))];

      return res.status(200).json({
        codigo: projeto.codigo,
        nome: projeto.nome,
        totalTarefas: totalTarefas,
        responsaveis: responsaveis
      });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno ao gerar resumo.' });
    }
  }
};