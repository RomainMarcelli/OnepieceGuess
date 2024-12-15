// setup.js

// Variables globales
let characters = [];
let currentLetter = '';
let currentRound = 0;
let maxRounds = 10;
let currentScore = 0;
let startTime;
let endTime;
let lives = 3;
let timerInterval;
let timeLeft;
let usedLetters = [];
let isAnswerSubmitted = false;
let difficultyLevel = 'medium';
let numPlayers = 1;
let currentPlayerIndex = 0;
let playerScores = [];
let playerNames = [];


// Gestion de la navigation entre les modes de jeu
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.guessPerso img').addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    document.querySelector('.devilFruit img').addEventListener('click', () => {
        window.location.href = '../devilfruit.html';
    });

    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'index.html') {
        document.querySelector('.guessPerso img').style.filter = 'drop-shadow(0 0 10px #faf9f3)';
    } else if (currentPage === '../devilfruit.html') {
        document.querySelector('.devilFruit img').style.filter = 'drop-shadow(0 0 10px #faf9f3)';
    }
});

// Afficher le menu de sélection des vies
document.querySelectorAll('.round-option').forEach((button) => {
    button.addEventListener('click', (event) => {
        const selectedRounds = parseInt(event.target.getAttribute('data-rounds'), 10);
        maxRounds = selectedRounds;

        // Masquer la sélection des rounds et afficher la sélection des vies
        document.getElementById('round-selection').style.display = 'none';
        document.getElementById('lives-selection').style.display = 'block';
    });
});


// Afficher le menu de sélection de la difficulté
document.querySelectorAll('input[name="lives-option"]').forEach(radio => {
    radio.addEventListener('change', () => {
        document.getElementById('lives-selection').style.display = 'none';
        const difficultySelection = document.getElementById('difficulty-selection');
        difficultySelection.style.display = 'block';
        setTimeout(() => {
            difficultySelection.style.opacity = '1';
        }, 100); // Transition d'apparition
    });
});

// Démarrer le jeu après la sélection de la difficulté
document.getElementById('start-game-button').addEventListener('click', () => {
    const difficulty = document.getElementById('difficulty-level').value;
    configureDifficulty(difficulty);
    document.getElementById('difficulty-selection').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    startRound();
});

// Configurer les paramètres en fonction de la difficulté
function configureDifficulty(difficulty) {
    if (difficulty === 'easy') {
        timeLeft = 20;
        // Ajuster characters si nécessaire pour inclure des mots plus simples
    } else if (difficulty === 'medium') {
        timeLeft = 15;
    } else if (difficulty === 'hard') {
        timeLeft = 10;
        // Ajuster characters pour inclure des mots plus rares
    }
}


function showPlayerNameInputs() {
    const playerNamesContainer = document.getElementById('player-names-container');
    playerNamesContainer.innerHTML = ''; // Réinitialiser le conteneur

    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Nom du joueur ${i + 1}`;
        input.className = 'player-name-input';
        input.dataset.playerIndex = i;
        playerNamesContainer.appendChild(input);
    }

    // Afficher la section de saisie des noms
    document.getElementById('player-names-selection').style.display = 'block';
}

// Fonction pour confirmer les noms des joueurs
document.getElementById('confirm-names-button').addEventListener('click', () => {
    const inputs = document.querySelectorAll('.player-name-input');
    playerNames = Array.from(inputs).map((input) => input.value.trim());

    // Vérification : tous les noms doivent être remplis
    if (playerNames.some((name) => name === '')) {
        alert('Veuillez entrer un nom pour chaque joueur.');
        return;
    }

    // Masquer la section de saisie des noms et afficher la sélection des rounds
    document.getElementById('player-names-selection').style.display = 'none';
    document.getElementById('round-selection').style.display = 'block';

    console.log('Joueurs:', playerNames); // Debug : afficher les noms dans la console
});

// Gestion de la sélection du nombre de joueurs
document.getElementById('confirm-players-button').addEventListener('click', () => {
    const numPlayersInput = document.getElementById('num-players');
    numPlayers = parseInt(numPlayersInput.value, 10);

    if (isNaN(numPlayers) || numPlayers < 1) {
        alert('Veuillez sélectionner un nombre valide de joueurs.');
        return;
    }

    // Masquer la sélection du nombre de joueurs et afficher les champs de noms
    document.getElementById('player-selection').style.display = 'none';
    showPlayerNameInputs();
});