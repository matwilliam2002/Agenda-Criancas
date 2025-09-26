const TarefaFilho = require('../models/tarefaFilho');
const Tarefa = require('../models/tarefa.model');
const Filho = require('../models/user.model');

const operacoesTarefasFilho = {
    create: async (req, res) => {
        try {
            const { tarefaId, dataHora } = req.body;

            const filhoId = req.usuario.id;
            console.log(req.usuario);

            console.log("usuário", filhoId);


            const novaTarefaFilho = await TarefaFilho.create({
                filhoId,
                tarefaId,
                dataHora,
                concluida: false,
            })
            return res.status(201).json({ message: 'Tarefa criada com sucesso', novaTarefaFilho });

        } catch (error) {
            res.status(500).json({ error: "Erro ao criar tarefaFilho" });
        }
    },

    mostrarTarefaFilho: async (req, res) => {
        try {
            const filhoId = req.usuario.id;
            const tarefaFilho = await TarefaFilho.findAll({
                where: {
                    filhoId,
                    concluida: false,
                },
                include: [{ model: Tarefa }]
            })

            res.json(tarefaFilho);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao listar tarefasFilho" });
        }
    },

    mostrarTarefafilhoPai: async (req, res) => {
        const filhoId = req.headers["x-custom-data"];
        console.log("Filho: ", filhoId);


        try {
            const tarefaFilho = await TarefaFilho.findAll({
                where: {
                    filhoId,
                },
                include: [{ model: Tarefa }]
            })
            res.json(tarefaFilho);
        } catch (error) {
            res.status(500).json({ error: "Erro ao listar tarefasFilho" });

        }
    },

    criarTarefaFilho: async (req, res) => {
        try {
            const { filhoId, tarefaId, dataHora } = req.body;

            const novaTarefaFilho = await TarefaFilho.create({
                filhoId,
                tarefaId,
                dataHora,
                concluida: false,
            })
            return res.status(201).json({ message: 'Tarefa criada com sucesso', novaTarefaFilho });

        } catch (error) {
            res.status(500).json({ error: "Erro ao criar tarefaFilho" });
        }
    },

    concluirTarefa: async (req, res) => {
        try {
            const { filhoId, tarefaId, valor } = req.body;

            console.log("Valores vindo do front: ", req.body);
            

            // 1. Marca a tarefa como concluída
            const tarefaConcluida = await TarefaFilho.update(
                { concluida: true },
                { where: { id: tarefaId } }
            );

            // 2. Atualiza a pontuação do filho
            const novaPontuacao = await Filho.increment("pontos", {
                by: valor,
                where: { id: filhoId } // 👈 cuidado, geralmente o campo no banco é "id"
            });

            // 3. Retorna tudo em uma resposta só
            return res.status(200).json({
                message: "Tarefa concluída e pontuação atualizada com sucesso",
                tarefaConcluida,
                novaPontuacao,
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao atualizar tarefa e pontuação" });
        }
    },

}

module.exports = operacoesTarefasFilho; 
