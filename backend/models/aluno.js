const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const alunoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    turma: { type: mongoose.Schema.Types.ObjectId, ref: 'turma', required: false },
    password: { type: String, required: true },
});

// Middleware para criptografar senha antes de salvar
alunoSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
