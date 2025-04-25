const express = require('express');
const router = express.Router();
const { createTurma, getTurmas, updateTurma, deleteTurma, getTurmaById } = require('../controllers/turmaController');

// Rotas de alunos
router.post('/', createTurma);
router.get('/', getTurmas);
router.get('/:id', getTurmaById);
router.put('/:id', updateTurma); 
router.delete('/:id', deleteTurma); 

module.exports = router;
