// Variables globales
let characters = [];
let currentLetter = '';
let currentRound = 0;
let maxRounds = 10; // Rounds par joueur (dynamique)
let totalRounds = 10; // Total des rounds (dynamique)
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
let playerLives = []; // Tableau pour les vies de chaque joueur


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
        const roundsPerPlayer = parseInt(event.target.getAttribute('data-rounds'), 10);
        totalRounds = numPlayers * roundsPerPlayer; // Total des rounds pour tous les joueurs
        maxRounds = roundsPerPlayer; // Rounds par joueur

        console.log(`Nombre total de rounds : ${totalRounds} (${roundsPerPlayer} par joueur)`);

        // Masquer la sélection des rounds et afficher la sélection des vies
        document.getElementById('round-selection').style.display = 'none';
        document.getElementById('lives-selection').style.display = 'block';
    });
});

// Afficher le menu de sélection de la difficulté
document.querySelectorAll('input[name="lives-option"]').forEach(radio => {
    radio.addEventListener('change', () => {
        // Cacher la sélection des vies
        document.getElementById('lives-selection').style.display = 'none';

        // Afficher la sélection de la difficulté avec `flex`
        const difficultySelection = document.getElementById('difficulty-selection');
        difficultySelection.style.display = 'flex'; // Passer en flexbox
        difficultySelection.style.opacity = '0'; // Préparer pour la transition
        difficultySelection.style.flexDirection = 'column'; // Organisation en colonne

        // Transition fluide pour l'apparition
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
    } else if (difficulty === 'medium') {
        timeLeft = 15;
    } else if (difficulty === 'hard') {
        timeLeft = 10;
    }
}

// Afficher les champs pour entrer les noms des joueurs
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

    document.getElementById('player-names-selection').style.display = 'block';
}

// Confirmer les noms des joueurs
document.getElementById('confirm-names-button').addEventListener('click', () => {
    const inputs = document.querySelectorAll('.player-name-input');
    playerNames = Array.from(inputs).map((input) => input.value.trim());

    if (playerNames.some((name) => name === '')) {
        alert('Veuillez entrer un nom pour chaque joueur.');
        return;
    }

    playerLives = Array(numPlayers).fill(3); // Chaque joueur commence avec 3 vies
    playerScores = Array(numPlayers).fill(0); // Initialiser les scores

    document.getElementById('player-names-selection').style.display = 'none';
    document.getElementById('round-selection').style.display = 'block';

    console.log('Joueurs:', playerNames);
    console.log('Vies initiales:', playerLives);

    initializeHearts(); // Ajouter cette ligne pour initialiser les cœurs après confirmation des joueurs
});



// Sélection du nombre de joueurs avec le menu déroulant personnalisé
document.getElementById('confirm-players-button').addEventListener('click', () => {
    const selectedOption = document.querySelector('.custom-dropdown .selected-option').textContent;
    const numPlayersMatch = selectedOption.match(/\d+/); // Extraire le numéro depuis le texte
    numPlayers = numPlayersMatch ? parseInt(numPlayersMatch[0], 10) : 0;

    if (isNaN(numPlayers) || numPlayers < 1) {
        alert('Veuillez sélectionner un nombre valide de joueurs.');
        return;
    }

    // Initialiser les scores des joueurs
    playerScores = Array(numPlayers).fill(0);

    // Masquer la sélection du nombre de joueurs et afficher les champs de saisie des noms
    document.getElementById('player-selection').style.display = 'none';
    showPlayerNameInputs();
});


document.querySelectorAll('.difficulty-option').forEach(option => {
    option.addEventListener('click', () => {
        // Retirer la classe "selected" de toutes les options
        document.querySelectorAll('.difficulty-option').forEach(opt => opt.classList.remove('selected'));

        // Ajouter la classe "selected" à l'option cliquée
        option.classList.add('selected');

        // Mettre à jour la difficulté globale
        difficultyLevel = option.getAttribute('data-value');
        console.log(`Difficulté sélectionnée : ${difficultyLevel}`);
    });
});


// Fonction pour afficher ou masquer le joueur actuel
function toggleCurrentPlayerDisplay() {
    const currentPlayerElement = document.getElementById('current-player');
    if (numPlayers === 1) {
        currentPlayerElement.style.display = 'none';
    } else {
        currentPlayerElement.style.display = 'block';
    }
}

// Après la confirmation des joueurs
document.getElementById('confirm-players-button').addEventListener('click', () => {
    const selectedOption = document.querySelector('.custom-dropdown .selected-option').textContent;
    const numPlayersMatch = selectedOption.match(/\d+/); // Extraire le numéro depuis le texte
    numPlayers = numPlayersMatch ? parseInt(numPlayersMatch[0], 10) : 0;

    if (isNaN(numPlayers) || numPlayers < 1) {
        alert('Veuillez sélectionner un nombre valide de joueurs.');
        return;
    }

    // Appelez la fonction pour gérer l'affichage
    toggleCurrentPlayerDisplay();

    // Initialiser les scores des joueurs
    playerScores = Array(numPlayers).fill(0);

    // Masquer la sélection du nombre de joueurs et afficher les champs de saisie des noms
    document.getElementById('player-selection').style.display = 'none';
    showPlayerNameInputs();
});


document.getElementById('start-game-button').addEventListener('click', () => {
    // Rendre les classes "descript" et "game-container" invisibles
    const descript = document.querySelector('.descript');
    const gameContainer = document.querySelector('.game-container');

    if (descript) {
        descript.style.display = 'none';
    }

    if (gameContainer) {
        gameContainer.style.display = 'none';
    }

    // Vous pouvez également afficher la div du jeu ici si nécessaire
    const game = document.getElementById('game');
    if (game) {
        game.style.display = 'block'; // Affiche la div #game
    }
});

function initializeHearts() {
    const heartsContainer = document.getElementById('active-player-hearts');

    // ✅ Vérifier si l'élément existe
    if (!heartsContainer) {
        console.error("❌ Erreur : l'élément #active-player-hearts n'existe pas dans le DOM !");
        return;
    }

    heartsContainer.innerHTML = ''; // Réinitialiser les cœurs

    playerLives = Array(numPlayers).fill(3); // Réinitialiser les vies pour chaque joueur

    // Ajouter les cœurs uniquement pour le premier joueur actif
    const playerHearts = document.createElement('div');
    playerHearts.className = 'player-hearts';
    playerHearts.id = `player-hearts-${currentPlayerIndex}`; // Un ID unique pour chaque joueur

    // Ajouter 3 cœurs pleins pour le joueur actif
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart full';
        heart.innerHTML = '&#10084;'; // Symbole de cœur
        playerHearts.appendChild(heart);
    }

    // Ajouter un label avec le nom du joueur actif
    const playerLabel = document.createElement('p');
    playerLabel.textContent = `${playerNames[currentPlayerIndex]} :`;
    playerHearts.prepend(playerLabel);

    heartsContainer.appendChild(playerHearts);
}
