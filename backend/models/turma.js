const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const turmaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    turno: { type: String, required: true, unique: false},
    alunos: { type: mongoose.Schema.Types.ObjectId, ref: 'aluno', required: false },
    professores: { type: mongoose.Schema.Types.ObjectId, ref: 'professor', required: false },
});


const Turma = mongoose.model('Turma', turmaSchema);

module.exports = Turma;
