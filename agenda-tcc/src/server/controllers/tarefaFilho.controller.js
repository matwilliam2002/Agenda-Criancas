const TarefaFilho = require('../models/tarefaFilho'); 
const Tarefa = require('../models/tarefa.model'); 

const operacoesTarefasFilho = {
    create: async(req, res) => {
        try {
            const {filhoId, tarefaId, dataHora} = req.body; 

            const novaTarefaFilho = await TarefaFilho.create({
                filhoId, 
                tarefaId, 
                dataHora,
                concluida: false, 
            })

            return res.status(201).json({message: 'Tarefa criada com sucesso', novaTarefaFilho}); 
            
            
        } catch (error) {
                res.status(500).json({ error: "Erro ao criar tarefaFilho" });
        }
    }, 

    mostrarTarefaFilho: async (req, res) => {
    try {
        const filhoId = req.usuario.id; 
        const tarefaFilho= await TarefaFilho.findAll({
            where: {filhoId},
            include: [{model: Tarefa}] 
        })

        const eventos = tarefaFilho.map(a =>({
            id:a.id, 
            title: a.Tarefa.nomeTarefa, 
            start: a.dataHora, 
            extendedProps: {
                concluida: a.concluida, 
                tarefaId: a.tarefaId, 
                valor: a.Tarefa.valorTarefa,
            }
        }))

        res.json(eventos); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar tarefasFilho" });
    }
    }
}

module.exports = operacoesTarefasFilho; 
