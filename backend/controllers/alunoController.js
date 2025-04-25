const User = require('../models/aluno');
const bcrypt = require('bcryptjs');

// Criar novo aluno
exports.createAluno = async (req, res) => {
    try {
        const { name, email, turma, password } = req.body;
        const aluno = new User({ name, email, turma, password });
        await aluno.save();
        res.status(201).json(aluno);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todos os alunos
exports.getAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find();
        res.status(200).json(alunos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Buscar um Aluno específico por ID
exports.getAlunoById = async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json(aluno);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Fazer login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const aluno = await Aluno.findOne({ email });
        if (!aluno) return res.status(400).json({ message: 'Aluno não encontrado' });

        const isMatch = await bcrypt.compare(password, aluno.password);
        if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

        res.status(200).json({ message: 'Login bem-sucedido', aluno });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar aluno
exports.updateAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, turma, password } = req.body;

        const updatedAluno = await Aluno.findByIdAndUpdate(id, { name, email, turma, password }, { new: true });
        if (!updatedAluno) return res.status(404).json({ message: 'Aluno não encontrado' });

        res.status(200).json(updatedAluno);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir aluno
exports.deleteAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAluno = await Aluno.findByIdAndDelete(id);
        if (!deletedAluno) return res.status(404).json({ message: 'Aluno não encontrado' });

        res.status(200).json({ message: 'Aluno excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
