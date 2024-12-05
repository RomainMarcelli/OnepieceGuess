let characters = []; // Liste des personnages
let currentLetter = ''; // Lettre actuelle
let currentRound = 0; // Nombre de personnages devinés
let maxRounds = 10; // Nombre maximum de personnages par partie (par défaut)
let currentScore = 0; // Score actuel
let startTime; // Heure de début de la partie
let endTime;   // Heure de fin de la partie

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

    if (currentRound >= maxRounds) {
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

    // Filtrer les personnages dont au moins une partie du nom ou des alias commence par la lettre actuelle
    const validAnswers = characters.filter((character) => {
        const nameParts = character.name.toLowerCase().split(' '); // Divise le nom complet en parties
        const aliasParts = (character.aliases || []).flatMap((alias) => alias.toLowerCase().split(' ')); // Divise les alias en parties
        const allParts = [...nameParts, ...aliasParts]; // Combine noms et alias
        return allParts.some((part) => part.startsWith(currentLetter.toLowerCase())); // Vérifie si une partie commence par la lettre
    });

    // Vérifier si l'entrée utilisateur correspond au critère (nom complet ou alias)
    const isCorrect = validAnswers.some((character) => {
        const nameParts = character.name.toLowerCase(); // Nom complet en minuscule
        const aliasParts = (character.aliases || []).map((alias) => alias.toLowerCase()); // Alias en minuscules

        // Vérifie si l'entrée correspond au nom complet ou à un alias et commence par la bonne lettre
        const allValidInputs = [
            character.name.toLowerCase(), // Nom complet
            ...aliasParts, // Alias
        ];
        return allValidInputs.some((validInput) =>
            validInput.startsWith(currentLetter.toLowerCase()) && validInput === playerInput
        );
    });

    if (isCorrect) {
        currentScore++;
        document.getElementById('feedback').textContent = 'Bonne réponse !';
        document.getElementById('feedback').style.color = 'green';
    } else {
        const validNames = validAnswers.map((character) => {
            const aliasesText = character.aliases && character.aliases.length > 0
                ? ` (Alias : ${character.aliases.join(', ')})`
                : '';
            return `${character.name}${aliasesText}`;
        }).join(', ');

        document.getElementById('feedback').textContent = `Mauvaise réponse. Réponses valides : ${validNames}`;
        document.getElementById('feedback').style.color = 'red';
    }

    currentRound++;
    document.getElementById('score').textContent = `Score : ${currentScore}`;

    // Passer à la manche suivante après 2 secondes
    setTimeout(startRound, 2000);
}




// Fonction pour terminer la partie
function endGame() {
    document.getElementById('letter-display').textContent = 'Partie terminée !';
    document.getElementById('feedback').textContent = `Votre score final est de ${currentScore} sur ${maxRounds}`;
    document.getElementById('player-input').disabled = true; // Désactiver l'entrée utilisateur
    document.getElementById('submit-button').disabled = true; // Désactiver le bouton
    document.getElementById('round-info').textContent = ''; // Effacer l'information des tours
}

// Fonction pour démarrer le jeu après la sélection des rounds
function startGame(selectedRounds) {
    maxRounds = selectedRounds; // Mettre à jour le nombre de rounds
    currentRound = 0; // Réinitialiser le compteur de rounds
    currentScore = 0; // Réinitialiser le score

    document.getElementById('round-selection').style.display = 'none'; // Cacher le menu de sélection
    document.getElementById('game').style.display = 'block'; // Afficher le jeu

    startRound(); // Démarrer le premier tour
}

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
    endTime = Date.now(); // Enregistrer l'heure de fin
    const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000); // Temps total en secondes
    const minutes = Math.floor(totalTimeInSeconds / 60); // Minutes
    const seconds = totalTimeInSeconds % 60; // Secondes restantes

    document.getElementById('letter-display').textContent = 'Partie terminée !';
    document.getElementById('feedback').textContent = `Votre score final est de ${currentScore} sur ${maxRounds}. Temps total : ${minutes}m ${seconds}s.`;
    document.getElementById('player-input').disabled = true; // Désactiver l'entrée utilisateur
    document.getElementById('submit-button').disabled = true; // Désactiver le bouton
    document.getElementById('round-info').textContent = ''; // Effacer l'information des tours
}
