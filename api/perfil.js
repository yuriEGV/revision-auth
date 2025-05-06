// --- api/perfil.js ---
import authMiddleware from '../middlewares/authMiddleware.js';
import { connectDB } from '../utils/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Método no permitido' });

  try {
    await connectDB();
    await authMiddleware(req, res, async () => {
      res.json({ msg: `Perfil del usuario ${req.usuario}` });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor', error: err.message });
  }
}