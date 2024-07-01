
const Sequelize = require('sequelize');

const sequelize = new Sequelize('libreria', 'sa', 'Jonny2305', {
    host: 'JUNIRANGER/SQLEXPRESS',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    }
});

module.exports = sequelize;