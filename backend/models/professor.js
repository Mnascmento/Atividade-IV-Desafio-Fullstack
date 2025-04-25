const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const professorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'disciplina', required: false },
    password: { type: String, required: true },
});

// Middleware para criptografar senha antes de salvar
professorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;
