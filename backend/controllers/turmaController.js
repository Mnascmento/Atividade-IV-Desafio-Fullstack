const User = require('../models/turma');
const bcrypt = require('bcryptjs');

exports.createTurma = async (req, res) => {
    try {
        const { name, turno, alunos, professores } = req.body;
        const turma = new User({ name, turno, alunos, professores });
        await turma.save();
        res.status(201).json(turma);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTurmas = async (req, res) => {
    try {
        const turmas = await Turma.find();
        res.status(200).json(turmas);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTurmaById = async (req, res) => {
    try {
        const turma = await Turma.findById(req.params.id);
        if (!turma) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }
        res.status(200).json(turma);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.updateTurma = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, turno, alunos, professores } = req.body;

        const updatedTurma = await Turma.findByIdAndUpdate(id, { name, turno, alunos, professores }, { new: true });
        if (!updatedTurma) return res.status(404).json({ message: 'Turma não encontrada' });

        res.status(200).json(updatedTurma);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTurma = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTurma = await Turma.findByIdAndDelete(id);
        if (!deletedTurma) return res.status(404).json({ message: 'Turma não encontrada' });

        res.status(200).json({ message: 'Turma excluída com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
