const express = require('express');
const cors = require('cors');
const sequelize = require('./config/config-db');
const path = require('path');
const autoresRouter = require('./routes/autores.routes');
const librosRouter = require('./routes/libros.routes');

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json({ type: "*/*"}))

// Ruta para servir el archivo index.html por defecto
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

//------Api rutas----------//

app.use('api/autores', autoresRouter);
app.use('api/libros', librosRouter);

//---------------Esuchando el servidor----------//

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Modelos sincronizados con la base de datos');
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto: ${port}`);
        });
    })
    .catch(error => {
        console.error('Error al sincronizar los modelos con la base de datos:', error);
    });
