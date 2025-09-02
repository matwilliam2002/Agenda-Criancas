const dataBase = require('../../database/db'); 
const Sequelize = require('sequelize'); 

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
    }
})
module.exports = Tarefa; 