const Premio = require('../models/premio.model'); 

const operacoesPremios = {
    create: async (req, res) => {
        try {
            const {nomePremio, valorPremio} = req.body; 
            console.log("req.body:", req.body);


            const premioExistente = await Premio.findOne({where: {nomePremio}});

            if(premioExistente){
                return res.status(400).json({message: "Este premio já existe"});
            }

            const imagem = req.file ? `../middllewares/uploadPremios/imagensPremios/${req.file.filename}` : null;
            
            const novoPremio = await Premio.create({
                nomePremio,
                valorPremio, 
                imagem
            }
                
            );
            return res.status(201).json({
                message: 'Premio cadastrado com sucesso: ',
                premio: novoPremio,
            }); 

        } catch (error) {
            return res.status(400).json({erro: error.message}); 
        }
    }
}

module.exports = operacoesPremios; 