const Sequelize = require('sequelize');
const database = require('../../database/db');

const Usuario = database.define('usuario',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    nome: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true, 
        validate: {
            isEmail: true, 
        }
    }, 

    senha: {
        type: Sequelize.STRING, 
        allowNull: false, 
    }
} )

module.exports = Usuario; 