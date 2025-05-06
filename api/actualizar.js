// --- api/actualizar.js ---
import authMiddleware from '../middlewares/authMiddleware.js';
import Usuario from '../models/Usuario.js';
import { connectDB } from '../utils/db.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Método no permitido' });

  try {
    await connectDB();
    await authMiddleware(req, res, async () => {
      const { nombre, email } = req.body;
      const usuario = await Usuario.findByIdAndUpdate(req.usuario, { nombre, email }, { new: true });
      res.json({ msg: 'Usuario actualizado correctamente', usuario });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor', error: err.message });
  }
}