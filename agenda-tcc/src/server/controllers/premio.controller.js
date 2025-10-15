const { where } = require('sequelize');
const Premio = require('../models/premio.model');

const operacoesPremios = {
    create: async (req, res) => {
        try {
            const { nomePremio, valorPremio } = req.body;
            const idPai = req.usuario.id;

            const premioExistente = await Premio.findOne({ where: { nomePremio, idPai } });

            if (premioExistente) {
                return res.status(400).json({ message: "Este premio já existe" });
            }

            const imagem = req.file ? req.file.filename : null;

            const novoPremio = await Premio.create({
                nomePremio,
                valorPremio,
                imagem,
                idPai,
            }

            );
            return res.status(201).json({
                message: 'Premio cadastrado com sucesso: ',
                premio: novoPremio,
            });

        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    },

    mostrarPremios: async (req, res) => {
        try {
            const idPai = req.usuario.id;

            const premiosLocalizados = await Premio.findAll({
                where:
                {
                    idPai,
                    
                }, 
                attributes: ["id", "nomePremio", "valorPremio", "imagem", "statusPremio"]
            });

            const premiosComUrl = premiosLocalizados.map((premio) => ({
                ...premio.toJSON(),
                imagemUrl: `${req.protocol}://${req.get("host")}/uploadsPremios/${premio.imagem}`
            }));

            return res.status(200).json(premiosComUrl);

        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    },

    mostrarPremiosFilho: async (req, res) => {
        try {
            const idPai = req.usuario.idPai;

            const premiosLocalizados = await Premio.findAll({
                where: { 
                    idPai, 
                    statusPremio: "ATIVA" 
                },
                attributes: ["id", "nomePremio", "valorPremio", "imagem", "statusPremio"]
            });

            const premiosComUrl = premiosLocalizados.map((premio) => ({
                ...premio.toJSON(),
                imagemUrl: `${req.protocol}://${req.get("host")}/uploadsPremios/${premio.imagem}`
            }));

            return res.status(200).json(premiosComUrl);

        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    },

    Desativar: async (req, res) => {
        try {
            const { idPremio } = req.body;

            const [PremioExcluido] = await Premio.update(
                { statusPremio: 'DESATIVADA' },
                { where: { id: idPremio } }
            )

            if (PremioExcluido === 0) {
                return res.status(404).json({ mensagem: "Prëmio não encontrada" });
            }

            return res.status(200).json({ mensagem: "Prëmio excluída com sucesso!" });

        } catch (error) {
            return res.status(400).json({ erro: error.message });

        }
    }, 

    ReativarPremio: async (req, res) => {
        try {
            const {premioId} = req.body;  

            await Premio.update(
                {statusPremio: 'ATIVA'},
                {where: {id: premioId}}, 
            )

        return res.status(200).json({message: "Tarefa ativada"}); 
        

       } catch (error) {
            console.error("Erro ao reativar tarefa:", error);
            return res.status(500).json({ message: "Erro interno ao reativar tarefa." });
       }
    }

}

module.exports = operacoesPremios; 