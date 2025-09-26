const express  = require('express');
const router = express.Router();
const operacoesTarefasFilho = require('../controllers/tarefaFilho.controller');
const authMiddleware = require('../middllewares/authMiddleware'); 


router.post("/criarTarefaFilho",authMiddleware, operacoesTarefasFilho.create); 
router.get('/mostrarTarefaFilho', authMiddleware, operacoesTarefasFilho.mostrarTarefaFilho);
router.get('/mostrarTarefaFilhoPai', authMiddleware, operacoesTarefasFilho.mostrarTarefafilhoPai);
router.post('/criarTarefaPai', authMiddleware, operacoesTarefasFilho.criarTarefaFilho);
router.put('/concluirTarefa', authMiddleware, operacoesTarefasFilho.concluirTarefa); 


module.exports = router; 