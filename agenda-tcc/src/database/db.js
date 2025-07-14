const Sequelize = require('sequelize');
const sequelize = new Sequelize('nomeBanco', 'root', 'senha', {
    dialect: 'postgree',
    host: 'localhost',
    port: 5432,
})

module.exports = sequelize;