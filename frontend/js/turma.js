document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api'; // Atualize para o URL correto da sua API
    const turmaModal = document.getElementById('turmaModal');
    const turmaForm = document.getElementById('turmaForm');
    const addTurmaBtn = document.getElementById('addTurmaBtn');
    const modalTitleTurma = document.getElementById('modalTitleTurma');
    let editTurmaId = null;

    // Função para carregar turmas
    const loadTurmas = async () => {
        const response = await fetch(`${apiUrl}/turma`);
        const turma = await response.json();
        const tableBody = document.querySelector('#turmaTable tbody');
        tableBody.innerHTML = '';

        turma.forEach(turma => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${turma.name}</td>
                <td>${turma.turno}</td>
                <td>${turma.alunos ? plantation.alunos.name : 'N/A'}</td>
                <td>
                    <button class="editTurmaBtn" data-id="${turma._id}">Editar</button>
                    <button class="deleteTurmaBtn" data-id="${turma._id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Adicionar eventos de edição e deleção
        document.querySelectorAll('.editTurmaBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditTurmaModal(e.target.dataset.id));
        });

        document.querySelectorAll('.deleteTurmaBtn').forEach(button => {
            button.addEventListener('click', (e) => deleteTurma(e.target.dataset.id));
        });
    };

    // Função para adicionar turma
    const addTurma = async (turma) => {
        await fetch(`${apiUrl}/turma`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(turma)
        });
        loadTurmas();
    };

    // Função para atualizar turma
    const updateTurma = async (id, turma) => {
        await fetch(`${apiUrl}/turma/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(turma)
        });
        loadTurmas();
    };

    // Função para deletar turmas
    const deleteTurma = async (id) => {
        await fetch(`${apiUrl}/turma/${id}`, {
            method: 'DELETE'
        });
        loadTurmas();
    };

    // Abrir modal para editar turma
    const openEditTurmaModal = async (id) => {
        editTurmaId = id;
        modalTitleTurma.innerText = 'Editar Turma';

        // Buscar os dados da turma para preencher o modal
        const response = await fetch(`${apiUrl}/turma/${id}`);
        if (response.status === 404) {
            console.error('Turma não encontrada');
            return;
        }
        const turma = await response.json();

        document.getElementById('nameTurma').value = turma.name;
        document.getElementById('turno').value = turma.turno;
        await loadUsers(turma.professores ? turma.professores._id : null);

        turmaModal.style.display = 'block';
    };

    // Abrir modal para adicionar nova turma
    const openAddTurmaModal = async () => {
        editTurmaId = null;
        modalTitleTurma.innerText = 'Adicionar Turma';
        TurmaForm.reset();
        await loadUsers(); // Carrega os usuários sem pré-selecionar nenhum
        turmaModal.style.display = 'block';
    };

    // Carregar usuários para o select de responsável
    const loadUsers = async (selectedUserId = null) => {
        const response = await fetch(`${apiUrl}/users`);
        const users = await response.json();
        const select = document.getElementById('responsible');
        select.innerHTML = ''; // Limpa o select

        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user._id;
            option.text = user.name;
            if (user._id === selectedUserId) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    };

    // Fechar modal ao clicar no "x"
    document.querySelector('.close').addEventListener('click', () => {
        turmaModal.style.display = 'none';
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === turmaModal) {
            turmaModal.style.display = 'none';
        }
    });

    // Submissão do formulário
    turmaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const turmaData = {
            name: document.getElementById('nameTurma').value,
            turno: document.getElementById('turno').value,
            alunos: document.getElementById('alunos').value,
            professores: document.getElementById('responsible').value

        };

        if (editTurmaId) {
            await updateTurma(editTurmaId, turmaData);
        } else {
            await addTurma(turmaData);
        }

        turmaModal.style.display = 'none';
        loadTurmas();
    });

    // Inicializando o carregamento de turmas
    addTurmaBtn.addEventListener('click', openAddTurmaModal);
    loadTurmas();
});
