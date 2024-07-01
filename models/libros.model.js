const sequelize = require('../config/config-db');
const {DataTypes} = require('sequelize');


const libros = sequelize.define('Libro', {
    
    id_libros: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fecha_publicacion: {
        type: DataTypes.STRING(55),
        allowNull: false
    },
    precio: {
        type: DataTypes.STRING(55),
        allowNull: false
    },
    id_autor: {
        type: DataTypes.STRING(55),
        allowNull: false
        
    }
}, {
    tableName: 'libros',
    timestamps: 'false'
});

module.exports = libros;
