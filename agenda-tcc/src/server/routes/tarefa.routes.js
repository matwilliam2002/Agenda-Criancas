const express  = require('express');
const router = express.Router();
const operacoesTrefa = require('../controllers/tarefa.controller');
const authMiddleware = require('../middllewares/authMiddleware'); 


router.post('/criarTarefa', authMiddleware, operacoesTrefa.create); 
router.patch('/atualizarTarefa', authMiddleware, operacoesTrefa.atualizar);
router.get('/buscarTiposTarefasDoFilho', authMiddleware, operacoesTrefa.buscarTarefasDofilho);

module.exports = router; 