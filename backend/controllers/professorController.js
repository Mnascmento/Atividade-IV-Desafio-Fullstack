const User = require('../models/professor');
const bcrypt = require('bcryptjs');

// Criar novo professor
exports.createProfessor = async (req, res) => {
    try {
        const { name, email, disciplina, password } = req.body;
        const professor = new User({ name, email, disciplina, password });
        await professor.save();
        res.status(201).json(professor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todos os professores
exports.getProfessores = async (req, res) => {
    try {
        const professores = await Professor.find();
        res.status(200).json(professores);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Buscar um professor específico por ID
exports.getProfessorById = async (req, res) => {
    try {
        const professor = await Professor.findById(req.params.id);
        if (!professor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.status(200).json(professor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Fazer login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const professor = await Professor.findOne({ email });
        if (!professor) return res.status(400).json({ message: 'Professor não encontrado' });

        const isMatch = await bcrypt.compare(password, professor.password);
        if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

        res.status(200).json({ message: 'Login bem-sucedido', professor });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar professor
exports.updateProfessor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, disciplina, password } = req.body;

        const updatedProfessor = await Professor.findByIdAndUpdate(id, { name, email, disciplina, password }, { new: true });
        if (!updatedProfessor) return res.status(404).json({ message: 'Professor não encontrado' });

        res.status(200).json(updatedProfessor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir professor
exports.deleteProfessor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProfessor = await Professor.findByIdAndDelete(id);
        if (!deletedProfessor) return res.status(404).json({ message: 'Professor não encontrado' });

        res.status(200).json({ message: 'Professor excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
