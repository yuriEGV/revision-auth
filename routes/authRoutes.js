
/*const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registro', authController.registrar);
router.post('/login', authController.login);

router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ msg: `Perfil del usuario ${req.usuario}` });
});

module.exports = router;
*/




/*const express = require('express');
const router = express.Router();
const { registrar, login, invalidateToken } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para registrar un usuario
router.post('/registro', registrar);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para invalidar un token
router.post('/invalidate', invalidateToken);


// Ruta para obtener el perfil del usuario autenticado
router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ msg: `Perfil del usuario ${req.usuario}` });
});

module.exports = router;*/




/*const express = require('express');
const router = express.Router();
const { registrar, login, invalidateToken } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const Usuario = require('../models/Usuario'); // Importa el modelo Usuario

// Ruta para registrar un usuario
router.post('/registro', registrar);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para invalidar un token
router.post('/invalidate', invalidateToken);

// Ruta para obtener el perfil del usuario autenticado
router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ msg: `Perfil del usuario ${req.usuario}` });
});

// Ruta para actualizar los datos del usuario autenticado
router.put('/actualizar', authMiddleware, async (req, res) => {
  const { nombre, email } = req.body;
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.usuario, { nombre, email }, { new: true });
    res.json({ msg: 'Usuario actualizado correctamente', usuario });
  } catch (err) {
    res.status(500).json({ msg: 'Error al actualizar usuario' });
  }
});
router.delete('/eliminar', authMiddleware, async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.usuario);
    res.json({ msg: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar usuario' });
  }
});

module.exports = router;*/



import express from 'express';
import { registrar, login, invalidateToken } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// Ruta para registrar un usuario
router.post('/registro', registrar);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para invalidar un token
router.post('/invalidate', invalidateToken);

// Ruta para obtener el perfil del usuario autenticado
router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ msg: `Perfil del usuario ${req.usuario}` });
});

// Ruta para actualizar los datos del usuario autenticado
router.put('/actualizar', authMiddleware, async (req, res) => {
  const { nombre, email } = req.body;
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.usuario, { nombre, email }, { new: true });
    res.json({ msg: 'Usuario actualizado correctamente', usuario });
  } catch (err) {
    res.status(500).json({ msg: 'Error al actualizar usuario' });
  }
});

// Ruta para eliminar al usuario autenticado
router.delete('/eliminar', authMiddleware, async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.usuario);
    res.json({ msg: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar usuario' });
  }
});

export default router;
