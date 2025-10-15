const express = require('express');
const router = express.Router();
const upload = require('../middllewares/uploadPremios/uploadConfig'); 
const operacoesPremios = require('../controllers/premio.controller');
const authMiddleware = require('../middllewares/authMiddleware');

//Rotas privadas / Criar premios
router.post('/createPremio', authMiddleware, upload.single("imagem"), operacoesPremios.create); 
router.get('/buscarPremio', authMiddleware, operacoesPremios.mostrarPremios); 
router.get('/buscarPremiosFilho', authMiddleware, operacoesPremios.mostrarPremiosFilho); 
router.patch('/desativarPremio', authMiddleware,  operacoesPremios.Desativar); 
router.patch('/reativarPremio', authMiddleware, operacoesPremios.ReativarPremio);

module.exports = router;  