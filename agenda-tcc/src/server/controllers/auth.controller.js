const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Op } = require('sequelize');

const validacao = {
    login: async (req, res) => {
        try {
            //const chaveJWT = process.env.CHAVE_JWT;
            const chaveJWT = '0nL_@V-EO^EeZ:!O|)!`';
            const { login, senha } = req.body;

            console.log('Login recebido:', login);

            const user = await Usuario.findOne({
                where: {
                    [Op.or]: [
                        { email: login },
                        { usuario: login }
                    ],
                    status: "ATIVO",
                }
            });

            if (!user) {
                console.log(`Usuário não encontrado ou desativado: ${login}`);
                return res.status(404).json({ mensagem: 'Usuário não encontrado ou desativado.' });
            }


            const senhaCorreta = await bcrypt.compare(senha, user.senha);
            if (!senhaCorreta) {
                return res.status(401).json({ erro: 'Senha incorreta' });
            }

            const token = jwt.sign(
                { id: user.id, usuario: user.usuario, idPai: user.idPai },
                chaveJWT,
                { expiresIn: '1h' }
            );

            res.json({ token });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro interno no servidor" });
        }
    }
};

module.exports = validacao;
