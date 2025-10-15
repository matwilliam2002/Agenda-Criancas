const sequelize = require("../../database/db");
const Sequelize = require("sequelize");
const Usuario = require("./user.model");
const Premio = require("./premio.model");

const ResgatePremios = sequelize.define("resgatePremios", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    dataResgate: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    pontosGastos: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

// Relações
ResgatePremios.belongsTo(Usuario, { foreignKey: "usuarioId" });
ResgatePremios.belongsTo(Premio, { foreignKey: "premioId" });

Usuario.hasMany(ResgatePremios, { foreignKey: "usuarioId" });
Premio.hasMany(ResgatePremios, { foreignKey: "premioId" });

module.exports = ResgatePremios;
