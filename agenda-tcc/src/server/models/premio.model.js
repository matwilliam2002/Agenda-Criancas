const sequelize = require('../../database/db');
const Sequelize = require('sequelize'); 
const Pai = require('./user.model'); 

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
    }, 

    statusPremio: {
        type: Sequelize.ENUM('ATIVA', 'DESATIVADA'), 
        allowNull: false, 
        defaultValue: 'ATIVA', 
    }, 

    idPai: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
    }
})

Pai.hasMany(Premio, {foreignKey: "idPai"}); 
Premio.belongsTo(Pai, {foreignKey: "idPai"}); 

module.exports = Premio; 