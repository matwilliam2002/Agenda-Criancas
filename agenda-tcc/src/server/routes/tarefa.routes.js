const express  = require('express');
const router = express.Router();
const operacoesTrefa = require('../controllers/tarefa.controller');

router.post('/createTarefa', operacoesTrefa.create); 

module.exports = router; 