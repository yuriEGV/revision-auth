// --- api/eliminar.js ---
import authMiddleware from '../middlewares/authMiddleware.js';
import Usuario from '../models/Usuario.js';
import { connectDB } from '../utils/db.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).json({ message: 'Método no permitido' });

  try {
    await connectDB();
    await authMiddleware(req, res, async () => {
      await Usuario.findByIdAndDelete(req.usuario);
      res.json({ msg: 'Usuario eliminado correctamente' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor', error: err.message });
  }
}