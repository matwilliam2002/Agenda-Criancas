const TarefaFilho = require('../models/tarefaFilho');
const Tarefa = require('../models/tarefa.model');

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
}

module.exports = operacoesTarefasFilho; 
