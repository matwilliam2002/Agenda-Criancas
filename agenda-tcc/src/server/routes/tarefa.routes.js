const express  = require('express');
const router = express.Router();
const operacoesTrefa = require('../controllers/tarefa.controller');
const authMiddleware = require('../middllewares/authMiddleware'); 


router.post('/criarTarefa', authMiddleware, operacoesTrefa.create); 
router.patch('/atualizarTarefa', authMiddleware, operacoesTrefa.atualizar);
router.get('/buscarTiposTarefasDoFilho', authMiddleware, operacoesTrefa.buscarTarefasDofilho);
router.get('/buscarTarefasAtivas', authMiddleware, operacoesTrefa.buscarTarefasAtivas);
router.patch('/desativar', authMiddleware, operacoesTrefa.desativar); 
router.patch('/reativar', authMiddleware, operacoesTrefa.reativar); 


module.exports = router; 