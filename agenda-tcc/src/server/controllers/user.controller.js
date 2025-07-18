const Usuario = require('../models/user.model');


exports.create = async (req, res) => {
    try{
        const novoUsuario = await Usuario.create(req.body);
        res.status(201).json(novoUsuario);
    }
    catch{
        res.status(400).json({ erro:message});
    }
}
