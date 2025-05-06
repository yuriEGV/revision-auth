
/*const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrar = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ msg: 'Usuario ya registrado' });

    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, email, password: hash });
    await nuevoUsuario.save();

    res.status(201).json({ msg: 'Usuario creado correctamente' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  const { email, password, duracion = '1m' } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: duracion === '6m' ? '180d' : '30d',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Error al iniciar sesión' });
  }
};*/


/*const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Simulación de almacenamiento de tokens (puedes usar una base de datos real)
const invalidatedTokens = new Set();

exports.registrar = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ msg: 'Usuario ya registrado' });

    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, email, password: hash });
    await nuevoUsuario.save();

    res.status(201).json({ msg: 'Usuario creado correctamente' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  const { email, password, duracion = '1m' } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const expiresIn = duracion === '6m' ? '180d' : '30d';
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Error al iniciar sesión' });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'no se ha proporcionado ningun Token' });

  if (invalidatedTokens.has(token)) {
    return res.status(401).json({ msg: 'El Token ha expirado o es invalido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token es invalido' });
  }
};

exports.invalidateToken = (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(400).json({ msg: 'No se ha proporcionado ningun Token' });

  invalidatedTokens.add(token);
  res.json({ msg: 'Token invalidated successfully' });
};*/

/*const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// Crear token con duración de 6 meses
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '180d' // 6 meses
  });
};

exports.registrar = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    usuario = new Usuario({ nombre, email, password });
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    await usuario.save();

    const token = generarToken(usuario._id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    const token = generarToken(usuario._id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};

*/



// --- controllers/authController.js ---
/*import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import { connectDB } from '../utils/db.js';

export async function registrar(req, res) {
  await connectDB();
  const { nombre, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();

    res.status(201).json({ msg: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(400).json({ msg: 'Error al registrar usuario', error: err.message });
  }
}

export async function login(req, res) {
  await connectDB();
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) return res.status(401).json({ msg: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '6m' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor', error: err.message });
  }
}

export async function invalidateToken(req, res) {
  res.status(200).json({ msg: 'Token invalidado (esto es un ejemplo)' });
}*/

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import { connectDB } from '../utils/db.js';

export async function registrar(req, res) {
  await connectDB();
  const { nombre, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();

    res.status(201).json({ msg: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(400).json({ msg: 'Error al registrar usuario', error: err.message });
  }
}

export async function login(req, res) {
  await connectDB();
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) return res.status(401).json({ msg: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '6m' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor', error: err.message });
  }
}

export async function invalidateToken(req, res) {
  res.status(200).json({ msg: 'Token invalidado (esto es un ejemplo)' });
}

// ✅ Nuevo middleware para verificar token
export function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ msg: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: 'Token inválido' });
    req.usuario = decoded.id;
    next();
  });
}
