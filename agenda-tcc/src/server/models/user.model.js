const Sequelize = require('sequelize');
const database = require('../../database/db');

const Usuario = database.define('usuarios',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    usuario: { // O filho vai acessar o site peelo usuário
        type: Sequelize.STRING(50),
        allowNull: true,
    },

    email: { // o pai vai acesar pela senha 
        type: Sequelize.STRING,
        allowNull: true, 
        unique: true, 
        validate: {
            isEmail: true, 
        }
    }, 

    senha: {
        type: Sequelize.STRING, 
        allowNull: false, 
    },

    pai: {
        type: Sequelize.BOOLEAN,
        allowNull: false , 
        defaultValue: true,
    }, 

    pontos: {
        type: Sequelize.INTEGER, // certo
        allowNull: true, 
    }, 

    idPai: {
        type: Sequelize.INTEGER, // certo
        allowNull: true, 
        references: {
            model: 'usuarios', 
            key: 'id'
        }
    }
}); 

Usuario.hasMany(Usuario,{
    foreignKey: 'idPai',
    as: 'filhos'
}); 

Usuario.belongsTo(Usuario, {
    foreignKey: 'idPai', 
    as: 'paiUsuario'
})

module.exports = Usuario; 