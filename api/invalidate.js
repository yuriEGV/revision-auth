// --- api/invalidate.js ---
import { invalidateToken } from '../controllers/authController.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método no permitido' });
  return invalidateToken(req, res);
}