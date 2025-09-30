const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');


const operacoes = {
    create: async (req, res) => { //Criar usuário normal
        const { senha, email } = req.body;

        try {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    
        const emailValido = regex.test(email);

        if (!emailValido) {
            return res.status(400).json({
                erro: "O email não é válido"
            });
        }

        if (!senha || senha.length < 10) {
            return res.status(400).json({ erro: "A senha precisa conter no mínimo 10 caracteres" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 8);
        req.body.senha = senhaCriptografada;

        const novoUsuario = await Usuario.create(req.body);
        return res.status(201).json(novoUsuario);
        } catch (err) {
        return res.status(400).json({ erro: err.message });
        }
    },

    createFilho: async(req, res) => { // Pai criando filho
        const {usuario, senha} = req.body; 

        try{
            const usuarioExistente = await Usuario.findOne({where : {usuario}}); 
            if(usuarioExistente){
                return res.status(400).json({message: 'Este usuário já existe'})
            }

            if(senha.length<6){
                return res.status(400). json({message: 'A senha precisa de pelo menos 6 caracteres'})
            }

            const idPai = req.usuario.id; 

            const senhaCriptografada = await bcrypt.hash(senha, 8); 
            req.body.senha = senhaCriptografada; 

            const novoFilho  = await Usuario.create({
                usuario, 
                senha: senhaCriptografada,
                pai: false, 
                pontos: 0, 
                idPai
            }); 
            return res.status(201).json(novoFilho); 
        }
    catch(err){
        return res.status(400).json({erro: err.message}); 
        }
    },

    mostrarFilho: async (req, res) => {
        try {
            const paiId = req.usuario.id;
            const filhos = await Usuario.findAll({
                where: {idPai: paiId}, 
                attributes: ["id","usuario", "pontos"]
            }); 
            res.json(filhos); 
        } catch (error) {
            console.error(error);
            res.status(401).json({erro: "Erro ao buscar os filhos"})
        }
    }, 

    atualizarFilho: async(req, res) => {
        try {
            const {id, usuario, senha } = req.body; 
            const filho = await Usuario.findByPk(id); 
8
            const senhaEncriptografada = await bcrypt.hash(senha, 8);

            if(!filho){
                return res.status(401).json({message: "Usuário nao encontrado"}); 
            }
            await filho.update({usuario, senha: senhaEncriptografada}); 
            return res.json({message: "Filho atualizado com sucesso", filho}); 
        } catch (error) {
            return res.status(500).json({ erro: "Erro ao atualizar filho", detalhes: error.message });
        }
    }, 

    buscarDadosFilho: async (req, res) => {
        try {
            const filhoId = req.usuario.id; 
            const dados = await Usuario.findByPk(filhoId); 
            res.json(dados); 
        } catch (error) {
            return res.status(500).json({ erro: "Erro ao atualizar filho", detalhes: error.message });
        }
    }
};

module.exports = operacoes;
