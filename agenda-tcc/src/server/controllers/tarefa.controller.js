const { where } = require('sequelize');
const Tarefa = require('../models/tarefa.model'); 

const operacoes = {
    create: async(req, res) => {
        try {
            const idPai = req.usuario.id; 
            const {nomeTarefa, valorTarefa} = req.body; 

            const tarefaExistente =  await Tarefa.findOne({where: {nomeTarefa}}); 

            if (tarefaExistente) {
                return res.status(400).json({message: "Esta tarefa já existe"})
            }

            if(!nomeTarefa || !valorTarefa){
                return res.status(400).json({message: 'favor inserir os valores'}); 
            }

            const novaTarefa = await Tarefa.create({
                nomeTarefa, 
                valorTarefa, 
                idPai,
            });


            return res.status(201).json({message: 'Tarefa Criada com sucesso', novaTarefa})

        } catch (error) {
            return res.status(400).json({erro: error.message}); 
        }
    }, 

   buscar: async (req, res) => {
        try {
            const idPai = req.usuario.id; 
            const tarefas = await Tarefa.findAll({
                where: { idPai }, 
                attributes: ["id", "nomeTarefa", "valorTarefa"]
            });
            return res.status(200).json(tarefas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar tarefas" });
        }
    }, 

    buscarTarefasFilho: async (req, res) => {
        try {
            const idPai = req.usuario.idPai; 
            const tarefas = await Tarefa.findAll({
                where: { idPai }, 
                attributes: ["id", "nomeTarefa", "valorTarefa"]
            });
            return res.status(200).json(tarefas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar tarefas" });
        }
    }, 

    atualizar: async (req, res) => {
        try {
            const {idTarefa, nomeTarefa, valorTarefa} = req.body; 
        
            const tarefaExistente = await Tarefa.findByPk(idTarefa); 
            console.log("Tarefa chegando no back",tarefaExistente);
            

            if (!tarefaExistente) {
                return res.status(400).json({message: 'Tarefa nao encontrada'}); 
            }

            if(!nomeTarefa || !valorTarefa){
                return res.status(400).json({message: 'favor inserir os valores'}); 
            }

            await tarefaExistente.update({nomeTarefa, valorTarefa}); 
            return res.status(201).json({message: "Tarefa atuzalizada com sucesso: ", tarefaExistente});
 
        } catch (error) {
            return res.status(400).json({erro: error.message}); 
        }
    }
}

module.exports = operacoes;