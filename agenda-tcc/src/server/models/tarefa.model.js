const dataBase = require('../../database/db'); 
const Sequelize = require('sequelize'); 
const Pai = require('./user.model'); 
const { toDefaultValue } = require('sequelize/lib/utils');


const Tarefa = dataBase.define('tarefas', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false
    }, 

    nomeTarefa: { 
        type: Sequelize.STRING, 
        allowNull: false
    }, 

    valorTarefa: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 

    status: {
        type: Sequelize.ENUM('ATIVA', 'DESATIVADA'),
        allowNull: false, 
        defaultValue: 'ATIVA'
    }
    
})

Pai.hasMany(Tarefa, {foreignKey: "idPai"}); 
Tarefa.belongsTo(Pai, {foreignKey: "idPai"}); 

module.exports = Tarefa; 