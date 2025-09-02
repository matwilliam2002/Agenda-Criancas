const sequelize = require('../../database/db');
const Sequelize = require('sequelize'); 

const Premio = sequelize.define('premios', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        allowNull: false, 
        primaryKey: true,
    }, 

    nomePremio: { 
        type: Sequelize.STRING(50), 
        allowNull: false,
    }, 

    valorPremio: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    imagem:{ 
        type: Sequelize.STRING,
        allowNull: true,
    }
})

module.exports = Premio; 