const express = require('express');
const router = express.Router();
const Operacoes = require('../controllers/resgatePremios.controller');
const authMiddleware = require('../middllewares/authMiddleware'); // se for usar depois

router.post('/resgatarPremio',  authMiddleware, Operacoes.Resgate);
router.get('/mostrarHistorico', authMiddleware, Operacoes.mostrarResgates); 

module.exports = router;
