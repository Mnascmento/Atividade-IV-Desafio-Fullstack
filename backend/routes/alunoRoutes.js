const express = require('express');
const router = express.Router();
const { createAluno, getAlunos, login, updateAluno, deleteAluno, getAlunoById } = require('../controllers/alunoController');

// Rotas de alunos
router.post('/', createAluno);
router.get('/', getAlunos);
router.get('/:id', getAlunoById);
router.post('/login', login);
router.put('/:id', updateAluno); 
router.delete('/:id', deleteAluno); 

module.exports = router;
