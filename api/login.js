// --- api/login.js ---
import { login } from '../controllers/authController.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método no permitido' });
  return login(req, res);
}