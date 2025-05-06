
/*const express = require('express');
const conectarDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
conectarDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/protected', verifyToken, protectedRouteHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
*/



/*const express = require('express');
const conectarDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Importar verifyToken desde authController
const { verifyToken } = require('./controllers/authController');

dotenv.config();
conectarDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/protected', verifyToken, (req, res) => {
  res.json({ msg: 'Ruta protegida accedida correctamente' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});*/

/*const express = require('express');
const conectarDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const { verifyToken } = require('./controllers/authController'); // Importa el middleware de verificación



dotenv.config();
conectarDB();

// Ruta protegida personalizada
app.use('/api/protected', verifyToken, (req, res) => {
  res.json({ msg: 'Ruta protegida accedida correctamente' });
});


const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
*/

/*const express = require('express');
const conectarDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const { verifyToken } = require('./controllers/authController'); // Importa el middleware de verificación

dotenv.config();
conectarDB();

const app = express(); // Inicializa 'app' antes de usarlo

app.use(cors());
app.use(express.json());

// Ruta protegida personalizada
app.use('/api/protected', verifyToken, (req, res) => {
  res.json({ msg: 'Ruta protegida accedida correctamente' });
});

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});*/


import express from 'express';
import conectarDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { verifyToken } from './controllers/authController.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
conectarDB();

const app = express();

app.use(cors());
app.use(express.json());

// Ruta protegida
app.use('/api/protected', verifyToken, (req, res) => {
  res.json({ msg: 'Ruta protegida accedida correctamente' });
});

// Rutas
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
