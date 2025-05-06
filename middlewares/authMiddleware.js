
/*const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ msg: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};
*/


/*const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
*/
// --- middlewares/authMiddleware.js ---
import jwt from 'jsonwebtoken';

export default async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.id;
    await next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido', error: err.message });
  }
}