/*const express = require('express');
const serverless = require('serverless-http');
const conectarDB = require('../config/db');
const authRoutes = require('../routes/authRoutes');
const cors = require('cors');

const app = express();

conectarDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

module.exports = app;
module.exports.handler = serverless(app);
*/

// api/index.js
import express from 'express';
import { router } from '../routes/authRoutes.js'; // ajusta la ruta si es necesario
import { verifyToken } from '../controllers/authController.js';
import connectDB from '../utils/db.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', router);
app.use('/api/protected', verifyToken, (req, res) => {
  res.json({ msg: 'Ruta protegida accedida correctamente' });
});

export default app;
