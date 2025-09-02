const express = require('express');
const router = express.Router();
const upload = require('../middllewares/uploadPremios/uploadConfig'); 
const operacoesPremios = require('../controllers/premio.controller');

//Rotas privadas / Criar premios
router.post('/createPremio', upload.single("imagem"), operacoesPremios.create); 

module.exports = router;  