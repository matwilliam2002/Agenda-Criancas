const Sequelize = require('sequelize');


const sequelize = new Sequelize('agendaCrianca', 'postgres', 'matwilliam', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
})

sequelize.authenticate()
    .then(() => {
        console.log('✅ Conexão bem-sucedida com o banco de dados!');
    })
    .catch((err) => {
        console.error('❌ Não foi possível conectar ao banco de dados:', err);
    });

module.exports = sequelize;