const TarefaFilho = require('../models/tarefaFilho');
const Tarefa = require('../models/tarefa.model');
const Filho = require('../models/user.model');
const { Op } = require("sequelize");


const operacoesTarefasFilho = {



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

    buscarTarefasCalendarioFilho: async (req, res) => {

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



            const tarefaConcluida = await TarefaFilho.update(
                { concluida: true },
                { where: { id: tarefaId } }
            );


            const novaPontuacao = await Filho.increment("pontos", {
                by: valor,
                where: { id: filhoId }
            });


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

    concluirTarefaFilho: async (req, res) => {
        try {
            const {tarefaId, valor } = req.body;

            const filhoId = req.usuario.id; 


            const tarefaConcluida = await TarefaFilho.update(
                { concluida: true },
                { where: { id: tarefaId } }
            );


            const novaPontuacao = await Filho.increment("pontos", {
                by: valor,
                where: { id: filhoId }
            });


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

    buscarTarefasCalendarioFilho: async (req, res) => {

        try {

            function inicioDoDia(date) {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            }

            function fimDoDia(date) {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
            }

            const filhoId = req.usuario.id;
            const hoje = new Date();

            const ontem = new Date(hoje);
            ontem.setDate(hoje.getDate() - 1);

            const amanha = new Date(hoje);
            amanha.setDate(hoje.getDate() + 1);

            const tarefas = await TarefaFilho.findAll({
                where: {
                    filhoId,
                    dataHora: {
                        [Op.or]: [
                            { [Op.between]: [inicioDoDia(ontem), fimDoDia(ontem)] },
                            { [Op.between]: [inicioDoDia(hoje), fimDoDia(hoje)] },
                            { [Op.between]: [inicioDoDia(amanha), fimDoDia(amanha)] },
                        ],
                    },
                },
                include: [{ model: Tarefa }]

            });

            return res.json(tarefas);

        } catch (error) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar tarefas" });
        }

    }

}

module.exports = operacoesTarefasFilho; 
