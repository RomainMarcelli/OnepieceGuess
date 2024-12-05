let characters = []; // Liste des personnages
let currentLetter = ''; // Lettre actuelle
let currentRound = 0; // Nombre de personnages devinés
let maxRounds = 10; // Nombre maximum de personnages par partie (par défaut)
let currentScore = 0; // Score actuel
let startTime; // Heure de début de la partie
let endTime;   // Heure de fin de la partie
let lives = 3; // Nombre de vies par défaut


document.addEventListener('DOMContentLoaded', () => {
    // Redirection sur clic des images
    document.querySelector('.guessPerso img').addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    document.querySelector('.devilFruit img').addEventListener('click', () => {
        window.location.href = '../devilfruit.html';
    });

    // Appliquer le filtre CSS sur l'image active
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'index.html') {
        document.querySelector('.guessPerso img').style.filter = 'drop-shadow(0 0 10px #faf9f3)';
    } else if (currentPage === '../devilfruit.html') {
        document.querySelector('.devilFruit img').style.filter = 'drop-shadow(0 0 10px #faf9f3)';
    }
});



// Fonction pour charger les personnages depuis l'API
async function fetchCharacters() {
    try {
        const response = await fetch('/api/characters');
        characters = await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des personnages :', error);
    }
}

// Fonction pour choisir une lettre aléatoire
function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// Fonction pour démarrer une nouvelle manche
function startRound() {
    if (currentRound === 0) {
        startTime = Date.now(); // Enregistrer l'heure de début de la partie
    }

    if (currentRound >= maxRounds || lives <= 0) {
        endGame(); // Terminer la partie si le nombre de manches est atteint
        return;
    }

    currentLetter = getRandomLetter();
    document.getElementById('letter-display').textContent = `${currentLetter}`;
    document.getElementById('player-input').value = ''; // Réinitialiser l'entrée utilisateur
    document.getElementById('feedback').textContent = ''; // Réinitialiser les feedbacks
    document.getElementById('round-info').textContent = `Tour : ${currentRound + 1} / ${maxRounds}`;
}


function checkAnswer() {
    const playerInput = document.getElementById('player-input').value.trim().toLowerCase();

    const validAnswers = characters.filter((character) => {
        const nameParts = character.name.toLowerCase().split(' ');
        const aliasParts = (character.aliases || []).flatMap((alias) => alias.toLowerCase().split(' '));
        const allParts = [...nameParts, ...aliasParts];
        return allParts.some((part) => part.startsWith(currentLetter.toLowerCase()));
    });

    const isCorrect = validAnswers.some((character) => {
        const nameParts = character.name.toLowerCase();
        const aliasParts = (character.aliases || []).map((alias) => alias.toLowerCase());
        const allValidInputs = [character.name.toLowerCase(), ...aliasParts];
        return allValidInputs.some((validInput) =>
            validInput.startsWith(currentLetter.toLowerCase()) && validInput === playerInput
        );
    });

    if (isCorrect) {
        currentScore++;
        document.getElementById('feedback').textContent = 'Bonne réponse !';
        document.getElementById('feedback').style.color = 'green';
    } else {
        lives--; // Réduire une vie
        document.getElementById('lives').textContent = `Vies restantes : ${lives}`;

        const validNames = validAnswers.map((character) => {
            const aliasesText = character.aliases && character.aliases.length > 0
                ? ` (Alias : ${character.aliases.join(', ')})`
                : '';
            return `${character.name}${aliasesText}`;
        }).join(', ');

        document.getElementById('feedback').textContent = `Mauvaise réponse. Réponses valides : ${validNames}`;
        document.getElementById('feedback').style.color = 'red';

        if (lives <= 0) {
            endGame(); // Terminer immédiatement si les vies sont épuisées
            return;
        }
    }

    currentRound++;
    document.getElementById('score').textContent = `Score : ${currentScore}`;

    setTimeout(startRound, 2000);
}


// Fonction pour démarrer le jeu après la sélection des rounds
function startGame(selectedRounds) {
    maxRounds = selectedRounds;
    currentRound = 0;
    currentScore = 0;
    const useLives = document.getElementById('lives-checkbox').checked;
    lives = useLives ? 3 : Infinity;
    document.getElementById('lives').style.display = useLives ? 'block' : 'none';
    document.getElementById('lives').textContent = `Vies restantes : ${lives}`;

    const roundSelection = document.getElementById('round-selection');
    roundSelection.style.animation = 'fadeOut 1s ease-in-out';

    // Attendre la fin de l'animation pour masquer le conteneur
    setTimeout(() => {
        roundSelection.style.display = 'none';
        document.getElementById('game').style.display = 'block'; // Afficher le jeu
        startRound(); // Démarrer le premier tour
    }, 1000); // Correspond à la durée de l'animation
}


function startGameWithLives(selectedRounds, useLives) {
    maxRounds = selectedRounds;
    currentRound = 0;
    currentScore = 0;
    lives = useLives ? 3 : Infinity; // Si avec vies, initialise à 3
    if (useLives) {
        document.getElementById('lives').style.display = 'block';
        document.getElementById('lives').textContent = `Vies restantes : ${lives}`;
    } else {
        document.getElementById('lives').style.display = 'none';
    }

    document.getElementById('round-selection').style.display = 'none'; // Cacher les sélections
    document.getElementById('lives-selection').style.display = 'none';
    document.getElementById('game').style.display = 'block'; // Afficher le jeu

    startRound(); // Démarrer le premier tour
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchCharacters(); // Charger les personnages

    // Gestion de la sélection du nombre de rounds
    document.querySelectorAll('.round-option').forEach((button) => {
        button.addEventListener('click', (event) => {
            const selectedRounds = parseInt(event.target.getAttribute('data-rounds'), 10);

            // Afficher la sélection des vies
            document.getElementById('round-selection').style.display = 'none';
            document.getElementById('lives-selection').style.display = 'block';

            // Gestion des options de vies
            const livesOptions = document.querySelectorAll('input[name="lives-option"]');
            livesOptions.forEach((option) => {
                option.addEventListener('change', () => {
                    document.getElementById('start-game-button').style.display = 'inline-block'; // Afficher le bouton Commencer
                });
            });

            // Démarrage du jeu après sélection
            document.getElementById('start-game-button').addEventListener('click', () => {
                const selectedOption = document.querySelector('input[name="lives-option"]:checked').value;
                const useLives = selectedOption === 'with-lives'; // Vérifie si l'utilisateur veut jouer avec vies
                startGameWithLives(selectedRounds, useLives);
            });
        });
    });

    // Soumettre avec le bouton "Soumettre"
    document.getElementById('submit-button').addEventListener('click', checkAnswer);

    // Soumettre avec la touche "Entrée"
    document.getElementById('player-input').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkAnswer(); // Vérifie la réponse
        }
    });
});



// Initialisation du jeu
document.addEventListener('DOMContentLoaded', async () => {
    await fetchCharacters(); // Charger les personnages

    // Gestion de la sélection du nombre de rounds
    document.querySelectorAll('.round-option').forEach((button) => {
        button.addEventListener('click', (event) => {
            const selectedRounds = parseInt(event.target.getAttribute('data-rounds'), 10);
            startGame(selectedRounds);
        });
    });

    // Soumettre avec le bouton "Soumettre"
    document.getElementById('submit-button').addEventListener('click', checkAnswer);

    // Soumettre avec la touche "Entrée"
    document.getElementById('player-input').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkAnswer(); // Vérifie la réponse
        }
    });
});

function endGame() {
    document.getElementById('letter-display').textContent = 'Partie terminée !';
    document.getElementById('feedback').textContent = `Votre score final est de ${currentScore} sur ${maxRounds}`;
    document.getElementById('player-input').disabled = true; // Désactiver l'entrée utilisateur
    document.getElementById('submit-button').disabled = true; // Désactiver le bouton
    document.getElementById('round-info').textContent = ''; // Effacer l'information des tours

    const gameContainer = document.querySelector('.game-container');

    // Efface les anciens boutons si présents
    const existingButtons = document.querySelector('.end-buttons');
    if (existingButtons) {
        existingButtons.remove();
    }

    // Conteneur pour le bouton et le select
    const endButtonsDiv = document.createElement('div');
    endButtonsDiv.className = 'end-buttons';
    endButtonsDiv.style.marginTop = '20px';

    // Select pour choisir le nombre de rounds
    const roundSelect = document.createElement('select');
    roundSelect.style.padding = '10px';
    roundSelect.style.borderRadius = '5px';

    [5, 10, 15, 20, 25].forEach((round) => {
        const option = document.createElement('option');
        option.value = round;
        option.textContent = `${round} Rounds`;
        if (round === maxRounds) {
            option.selected = true; // Sélectionne le nombre de rounds actuel
        }
        roundSelect.appendChild(option);
    });

    // Bouton pour recommencer
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Recommencer';
    restartButton.style.marginLeft = '10px';
    restartButton.style.padding = '10px';
    restartButton.style.borderRadius = '5px';
    restartButton.style.backgroundColor = '#4CAF50';
    restartButton.style.color = 'white';
    restartButton.style.cursor = 'pointer';

    restartButton.addEventListener('click', () => {
        const newRounds = parseInt(roundSelect.value, 10);
        resetGame(newRounds); // Recommence avec le nombre de rounds sélectionné
    });

    // Ajouter le select et le bouton au conteneur
    endButtonsDiv.appendChild(roundSelect);
    endButtonsDiv.appendChild(restartButton);

    // Ajouter le conteneur à la fin de la partie
    gameContainer.appendChild(endButtonsDiv);
}

// Fonction pour réinitialiser le jeu
function resetGame(rounds) {
    currentRound = 0;
    maxRounds = rounds;
    currentScore = 0;
    lives = 3; // Réinitialiser les vies
    document.getElementById('lives').textContent = `Vies restantes : ${lives}`;
    document.getElementById('player-input').disabled = false; // Réactiver l'entrée utilisateur
    document.getElementById('submit-button').disabled = false; // Réactiver le bouton
    document.getElementById('score').textContent = `Score : 0`;
    document.querySelector('.end-buttons').remove(); // Supprimer les boutons de fin de partie
    startRound(); // Démarrer une nouvelle partie
}
