const express = require('express');
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
