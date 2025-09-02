const express = require('express');
const router = express.Router();
const operacoes = require('../controllers/user.controller');
const validacao = require('../controllers/auth.controller');
const authMiddleware = require('../middllewares/authMiddleware'); 


//Rotas públicas
router.post('/create', operacoes.create); // Rota para criar usuário tanto pai quanto o filho
router.post('/login', validacao.login); // ROta para logar

//Rotas privadas / Criar usuário
router.post('/createFilho', authMiddleware, operacoes.createFilho); 
router.get('/mostrarFilho', authMiddleware, operacoes.mostrarFilho);  
router.patch('/atualizarFilho', authMiddleware, operacoes.atualizarFilho); 


module.exports = router; 