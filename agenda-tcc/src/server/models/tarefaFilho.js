const sequelize = require('../../database/db'); 
const Sequelize = require('sequelize'); 
const Filho = require('./user.model'); 
const Tarefa = require('./tarefa.model')


const TarefaFilho = sequelize.define('tarefasFilhos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        autoIncrement: true
    },

    concluida: {
        type: Sequelize.BOOLEAN, 
        allowNull: false,
        defaultValue: false
    }, 
    
    dataHora: {
        type: Sequelize.DATE,
        allowNull: false,
    }, 
}); 

Filho.hasMany(TarefaFilho, {foreignKey: 'filhoId'}); 
TarefaFilho.belongsTo(Filho, {foreignKey: 'filhoId'});

Tarefa.hasMany(TarefaFilho, {foreignKey: 'tarefaId'}); 
TarefaFilho.belongsTo(Tarefa, {foreignKey: 'tarefaId'}); 

module.exports = TarefaFilho; 



