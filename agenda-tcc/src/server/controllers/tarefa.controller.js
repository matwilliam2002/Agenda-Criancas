const { where } = require('sequelize');
const Tarefa = require('../models/tarefa.model');

const operacoes = {
    create: async (req, res) => {
        try {
            const idPai = req.usuario.id;
            const { nomeTarefa, valorTarefa } = req.body;

            const tarefaExistente = await Tarefa.findOne({ where: { nomeTarefa } });

            if (tarefaExistente) {
                return res.status(400).json({ message: "Esta tarefa já existe" })
            }

            if (!nomeTarefa || !valorTarefa) {
                return res.status(400).json({ message: 'favor inserir os valores' });
            }

            const novaTarefa = await Tarefa.create({
                nomeTarefa,
                valorTarefa,
                idPai,
                status: 'ATIVA'
            });

            return res.status(201).json({ message: 'Tarefa Criada com sucesso', novaTarefa })

        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    },

    buscarTarefasDofilho: async (req, res) => {
        try {
            const idPai = req.usuario.id;
            const tarefas = await Tarefa.findAll({
                where: {
                    idPai,
                },
                attributes: ["id", "nomeTarefa", "valorTarefa", "status"]
            });
            return res.status(200).json(tarefas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar tarefas" });
        }
    },

    buscarTarefasAtivas: async (req, res) => {
        try {
            const idPai = req.usuario.id;
            const tarefas = await Tarefa.findAll({
                where: {
                    idPai,
                    status: "ATIVA"
                },
                attributes: ["id", "nomeTarefa", "valorTarefa", "status"]
            });
            return res.status(200).json(tarefas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar tarefas" });
        }
    },



    atualizar: async (req, res) => {
        try {
            const { idTarefa, nomeTarefa, valorTarefa } = req.body;

            // 🔹 1. Verifica se todos os campos foram enviados
            if (!idTarefa || !nomeTarefa) {
                return res.status(400).json({ message: 'Favor inserir todos os valores' });
            }

            // 🔹 2. Verifica se a tarefa existe
            const tarefaExistente = await Tarefa.findByPk(idTarefa);
            if (!tarefaExistente) {
                return res.status(404).json({ message: 'Tarefa não encontrada' });
            }

            // 🔹 3. Verifica se já existe outra tarefa com o mesmo nome
            const tarefaNome = await Tarefa.findOne({
                where: { nomeTarefa }
            });

            if (tarefaNome && tarefaNome.id !== tarefaExistente.id) {
                return res.status(400).json({ message: 'Já existe uma tarefa com esse nome' });
            }

            // 🔹 4. Atualiza os dados
            await tarefaExistente.update({ nomeTarefa, valorTarefa });

            // 🔹 5. Retorna sucesso
            return res.status(200).json({
                message: "Tarefa atualizada com sucesso",
                tarefaAtualizada: tarefaExistente
            });

        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            return res.status(500).json({ erro: error.message });
        }
    },

    reativar: async (req, res) => {
        try {
            const { tarefaId } = req.body;

            await Tarefa.update(
                { status: 'ATIVA' },
                { where: { id: tarefaId } },
            )

            return res.status(200).json({ message: "Tarefa ativada" });


        } catch (error) {
            console.error("Erro ao reativar tarefa:", error);
            return res.status(500).json({ message: "Erro interno ao reativar tarefa." });
        }
    },

    desativar: async (req, res) => {
        try {
            const { idTarefa, status } = req.body;

            const [TarefaDesativada] = await Tarefa.update(
                { status },
                { where: { id: idTarefa } }
            )

            if (TarefaDesativada === 0) {
                return res.status(404).json({ mensagem: "Tarefa não encontrada" });
            }

            return res.status(200).json({ mensagem: "Tarefa desativada com sucesso!" });

        } catch (error) {
            return res.status(400).json({ erro: error.message });

        }
    }
}

module.exports = operacoes;