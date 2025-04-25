const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    docente: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Disciplina = mongoose.model('Disciplina', disciplinaSchema);

module.exports = Disciplina;
