const express = require('express');
const Autor  = require('../models/autores.model');

const autoresRouter = express.Router();

// Método para agregar un autor
autoresRouter.post('/agregar', async (req, res) => {
    try {
        const { nombre, apellido, fecha_nacimiento } = req.body;
        const newAutor = await Autor.create({ nombre, apellido, fecha_nacimiento });
        res.status(201).json(newAutor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Método para obtener todos los autores
autoresRouter.get('/leer', async (req, res) => {
    try {
        const autores = await Autor.findAll();
        res.json(autores);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Método para actualizar un autor
autoresRouter.put('/editar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, fecha_nacimiento } = req.body;
        const autor = await Autor.findByPk(id);
        
        if (autor) {
            autor.nombre = nombre;
            autor.apellido = apellido;
            autor.fecha_nacimiento = fecha_nacimiento;
            await autor.save();
            res.json(autor);
        } else {
            res.status(404).json({ message: 'Autor no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Método para eliminar un autor
autoresRouter.delete('/eliminar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const autor = await Autor.findByPk(id);
        
        if (autor) {
            await autor.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Autor no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = autoresRouter;
