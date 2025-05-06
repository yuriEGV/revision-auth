
/*const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
*/
// --- models/Usuario.js ---
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String
});

export default mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);