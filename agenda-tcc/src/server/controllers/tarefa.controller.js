const Tarefa = require('../models/tarefa.model'); 

const operacoes = {
    create: async(req, res) => {
        try {
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
            });


            return res.status(201).json({message: 'Tarefa Criada com sucesso', novaTarefa})

        } catch (error) {
            return res.status(400).json({erro: error.message}); 
        }
    }
}

module.exports = operacoes;