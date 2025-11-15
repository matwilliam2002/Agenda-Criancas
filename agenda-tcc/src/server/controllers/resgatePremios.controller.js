const ResgatePremio = require('../models/resgatePremios');
const Usuario = require(`../models/user.model`);
const Premio = require('../models/premio.model');

const Operacoes = {
    Resgate: async (req, res) => {
        try {
            const { dataResgate, pontosGastos, premioId } = req.body;
            const usuarioId = req.usuario.id;

            

            const usuarioEncontrado = await Usuario.findByPk(usuarioId);

            console.log("Pontos: ", usuarioEncontrado.pontos);
            console.log("Horário: ", dataResgate);
            console.log("Usuário encontrado: ", usuarioId);
            console.log("Pontos gastos", pontosGastos);
            



            if (usuarioEncontrado.pontos < pontosGastos) {
                return res.status(400).json({ erro: "Pontos insuficientes para realizar o resgate." });
            }

            const novoResgate = await ResgatePremio.create({
                dataResgate,
                pontosGastos,
                premioId,
                usuarioId,
            })

            await Usuario.decrement(
                { pontos: pontosGastos },
                { where: { id: usuarioId } },
            )

            return res.status(200).json({ message: 'Resgate do premio com sucesso', novoResgate });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    },

    mostrarResgates: async (req, res) => {
        try {
            const usuarioId = req.headers['idfilho'];


            const historicoResgate = await ResgatePremio.findAll({
                where: { usuarioId },
                include: [{ model: Premio }]
            })

            return res.json(historicoResgate);
            
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

}

module.exports = Operacoes; 