// --- api/registro.js ---
import { registrar } from '../controllers/authController.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método no permitido' });
  return registrar(req, res);
}