// // Variables globales pour la gestion des joueurs
// let numPlayers = 1; // Nombre de joueurs (par défaut, un seul joueur)
// let currentPlayerIndex = 0; // Index du joueur actif
// let playerScores = []; // Tableau des scores des joueurs

/**
 * Affiche la sélection des joueurs
 */
function showPlayerSelection() {
    const playerSelection = document.getElementById('player-selection');
    playerSelection.style.display = 'block';
}

/**
 * Confirme le nombre de joueurs et initialise les scores
 */
function confirmPlayerSelection() {
    // Récupérer le nombre de joueurs sélectionné
    numPlayers = parseInt(document.getElementById('num-players').value, 10);

    if (isNaN(numPlayers) || numPlayers < 1) {
        alert("Veuillez sélectionner un nombre valide de joueurs.");
        return;
    }

    // Afficher la section pour entrer les noms des joueurs
    document.getElementById('player-selection').style.display = 'none';
    document.getElementById('player-names').style.display = 'block';

    // Générer les champs pour entrer les noms
    generatePlayerNameInputs();
}


/**
 * Met à jour l'interface pour afficher le joueur actif
 */
function updateCurrentPlayer() {
    const currentPlayerDisplay = document.getElementById('current-player');
    if (currentPlayerDisplay) {
        currentPlayerDisplay.textContent = `Joueur actuel : Joueur ${currentPlayerIndex + 1}`;
    }
}

/**
 * Passe au joueur suivant après une manche
 */
function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % numPlayers;
    updateCurrentPlayer();
}

/**
 * Met à jour le score du joueur actif
 * @param {boolean} isCorrect - Indique si la réponse était correcte
 */
function updatePlayerScore(isCorrect) {
    if (isCorrect) {
        playerScores[currentPlayerIndex]++;
    }
}

/**
 * Affiche le tableau des scores à la fin du jeu
 */
function showScoreboard() {
    const scoreboard = document.createElement('div');
    scoreboard.id = 'scoreboard';
    scoreboard.innerHTML = `<h3>Tableau des scores</h3>`;

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Joueur</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            ${playerScores
            .map((score, index) => `<tr><td>Joueur ${index + 1}</td><td>${score}</td></tr>`)
            .join('')}
        </tbody>
    `;
    scoreboard.appendChild(table);

    const gameContainer = document.querySelector('.game-container');
    gameContainer.appendChild(scoreboard);
}

/**
 * Met à jour le tableau des scores en cours de jeu
 */
function updateScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    if (!scoreboard) return;

    scoreboard.innerHTML = `
        <h3>Tableau des scores</h3>
        <ul>
            ${playerScores
                .map((score, index) => `<li>Joueur ${index + 1} : ${score} points</li>`)
                .join('')}
        </ul>
    `;
}

document.getElementById('confirm-players-button').addEventListener('click', () => {
    // Récupérer le nombre de joueurs
    numPlayers = parseInt(document.getElementById('num-players').value, 10);

    // Initialiser les scores des joueurs
    playerScores = Array(numPlayers).fill(0);

    // Masquer la sélection des joueurs et afficher la sélection des rounds
    document.getElementById('player-selection').style.display = 'none';
    document.getElementById('round-selection').style.display = 'block';
});



function generatePlayerNameInputs() {
    const playerNamesContainer = document.getElementById('player-names-container');
    playerNamesContainer.innerHTML = ''; // Réinitialiser les champs
    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `player-name-${i}`;
        input.placeholder = `Nom du Joueur ${i + 1}`;
        input.required = true;
        playerNamesContainer.appendChild(input);
    }
}

function confirmPlayerNames() {
    const playerNamesContainer = document.getElementById('player-names-container');
    const inputs = playerNamesContainer.querySelectorAll('input');

    playerNames = [];
    for (let i = 0; i < inputs.length; i++) {
        const name = inputs[i].value.trim();
        if (!name) {
            alert(`Veuillez entrer un nom valide pour le Joueur ${i + 1}.`);
            return;
        }
        playerNames.push(name);
    }

    document.getElementById('player-names-selection').style.display = 'none';
    document.getElementById('round-selection').style.display = 'block';
}

function showPlayerNamesInputs() {
    const playerNamesContainer = document.getElementById('player-names-container');
    playerNamesContainer.innerHTML = ''; // Réinitialiser les champs
    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Nom du Joueur ${i + 1}`;
        input.id = `player-name-${i}`;
        playerNamesContainer.appendChild(input);
    }

    document.getElementById('player-selection').style.display = 'none';
    document.getElementById('player-names-selection').style.display = 'block';
}

// Bouton pour confirmer les noms des joueurs
document.getElementById('confirm-names-button').addEventListener('click', confirmPlayerNames);

function confirmPlayerSelection() {
    numPlayers = parseInt(document.getElementById('num-players').value, 10);
    if (isNaN(numPlayers) || numPlayers < 1) {
        alert("Veuillez sélectionner un nombre valide de joueurs.");
        return;
    }

    playerScores = Array(numPlayers).fill(0); // Initialiser les scores
    showPlayerNamesInputs();
}

