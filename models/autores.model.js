const { DataTypes } = require('sequelize');
const sequelize = require('../config/config-db');

const Autor = sequelize.define('Autor', {

    id_autor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(55),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(55),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.STRING(55),
        allowNull: false
    }
}, {
    tableName: 'autores',
    timestamps: false
});

module.exports = Autor;
