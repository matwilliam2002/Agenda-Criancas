const express = require('express');
const router = express.router;
const userController = require('../controllers/user.controller');

router.post('/users', userController.create);


module.exports = router; 