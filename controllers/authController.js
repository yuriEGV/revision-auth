
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


const Usuario = require('../models/Usuario');
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
};
