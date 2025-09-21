const express  = require('express');
const router = express.Router();
const operacoesTarefasFilho = require('../controllers/tarefaFilho.controller');
const authMiddleware = require('../middllewares/authMiddleware'); 


router.post("/criarTarefaFilho", operacoesTarefasFilho.create); 
router.get('/mostrarTarefaFilho', authMiddleware, operacoesTarefasFilho.mostrarTarefaFilho);

module.exports = router; 