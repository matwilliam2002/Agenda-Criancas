const express  = require('express');
const router = express.Router();
const operacoesTarefasFilho = require('../controllers/tarefaFilho.controller');
const authMiddleware = require('../middllewares/authMiddleware'); 


router.get('/mostrarTarefaFilhoPai', authMiddleware, operacoesTarefasFilho.mostrarTarefafilhoPai);
router.post('/criarTarefaPai', authMiddleware, operacoesTarefasFilho.criarTarefaFilho);
router.put('/concluirTarefa', authMiddleware, operacoesTarefasFilho.concluirTarefa); 
router.get('/mostrarTarefasFilho', authMiddleware, operacoesTarefasFilho.buscarTarefasCalendarioFilho);
router.put('/concluirTarefaFilho', authMiddleware, operacoesTarefasFilho.concluirTarefaFilho); 


module.exports = router; 