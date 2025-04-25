const Disciplina = require('../models/disciplina');

// Criar nova plantação
exports.createDisciplina = async (req, res) => {
    try {
        const { name, description, docente } = req.body;
        const disciplina = new Disciplina({ name, description, docente });
        await disciplina.save();
        res.status(201).json(disciplina);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todas as plantações
exports.getDisciplinas = async (req, res) => {
    try {
        const disciplina = await Disciplina.find().populate('docente', 'name');
        res.status(200).json(disciplina);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getDisciplinaById = async (req, res) => {
    try {
        const disciplina = await Disciplina.findById(req.params.id).populate('docente', 'name');
        if (!disciplina) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        res.status(200).json(disciplina);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar plantação
exports.updateDisciplina = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, docente } = req.body;

        const updatedDisciplina = await Disciplina.findByIdAndUpdate(id, { name, description, docente }, { new: true });
        if (!updatedDisciplina) return res.status(404).json({ message: 'Disciplina não encontrada' });

        res.status(200).json(updatedDisciplina);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir plantação
exports.deleteDisciplina = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDisciplina = await Disciplina.findByIdAndDelete(id);
        if (!deletedDisciplina) return res.status(404).json({ message: 'Disciplina não encontrada' });

        res.status(200).json({ message: 'Disciplina excluída com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
