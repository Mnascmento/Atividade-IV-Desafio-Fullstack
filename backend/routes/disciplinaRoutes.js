const express = require('express');
const router = express.Router();
const { createDisciplina, getDisciplinas, updateDisciplina, deleteDisciplina, getDisciplinaById } = require('../controllers/disciplinaController');

// Rotas de Disciplinas
router.post('/', createDisciplina);
router.get('/', getDisciplinas);
router.get('/:id', getDisciplinaById);
router.put('/:id', updateDisciplina); 
router.delete('/:id', deleteDisciplina); 

module.exports = router;
