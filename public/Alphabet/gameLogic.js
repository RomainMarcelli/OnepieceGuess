// gameLogic.js

// Charger les personnages depuis l'API
async function fetchCharacters() {
    try {
        const response = await fetch('/api/characters');
        const allCharacters = await response.json();

        // Filtrer les personnages en fonction de la difficulté
        if (difficultyLevel === 'easy') {
            characters = allCharacters.filter(c => c.popularity > 80); // Personnages populaires
        } else if (difficultyLevel === 'hard') {
            characters = allCharacters.filter(c => c.popularity <= 40); // Personnages rares
        } else {
            characters = allCharacters; // Tous les personnages pour niveau moyen
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des personnages :', error);
    }
}


function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let newLetter;

    // Répéter jusqu'à obtenir une lettre non utilisée
    do {
        newLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    } while (usedLetters.includes(newLetter));

    // Ajouter la lettre à la liste des lettres utilisées
    usedLetters.push(newLetter);
    return newLetter;
}

function resetUsedLetters() {
    usedLetters = [];
}

function startRound() {
    if (currentRound === 0) {
        startTime = Date.now(); // Enregistrer l'heure de début de la partie
    }

    // Vérifier si le jeu doit se terminer
    if (currentRound >= maxRounds || lives <= 0) {
        endGame(); // Terminer la partie si toutes les manches ont été jouées
        return;
    }

    // Alterner les joueurs
    document.getElementById('current-player').textContent = `Joueur actuel : Joueur ${currentPlayerIndex + 1}`;

    // Nouvelle lettre aléatoire
    currentLetter = getRandomLetter();
    document.getElementById('letter-display').textContent = currentLetter;

    // Réinitialiser l'entrée utilisateur
    document.getElementById('player-input').value = '';
    document.getElementById('feedback').textContent = '';

    // Temps ajusté selon le niveau
    if (difficultyLevel === 'easy') {
        timeLeft = 20; // 20 secondes pour facile
    } else if (difficultyLevel === 'hard') {
        timeLeft = 10; // 10 secondes pour difficile
    } else {
        timeLeft = 15; // 15 secondes pour moyen
    }

    updateTimerDisplay(); // Mettre à jour l'affichage initial du timer
    startTimer(); // Démarrer le compte à rebours
}

function checkAnswer() {
    if (isAnswerSubmitted) {
        return; // Empêcher les exécutions multiples
    }
    isAnswerSubmitted = true; // Activer le verrou

    clearInterval(timerInterval); // Arrêter le timer pour éviter tout conflit
    const playerInput = document.getElementById('player-input').value.trim().toLowerCase();

    const validAnswers = characters.filter((character) => {
        const nameParts = character.name.toLowerCase().split(' ');
        const aliasParts = (character.aliases || []).flatMap((alias) => alias.toLowerCase().split(' '));
        const allParts = [...nameParts, ...aliasParts];
        return allParts.some((part) => part.startsWith(currentLetter.toLowerCase()));
    });

    const isCorrect = validAnswers.some((character) => {
        const allValidInputs = [character.name.toLowerCase(), ...(character.aliases || []).map((alias) => alias.toLowerCase())];
        return allValidInputs.some((validInput) =>
            validInput.startsWith(currentLetter.toLowerCase()) && validInput === playerInput
        );
    });

    if (isCorrect) {
        // Ajouter un point au score du joueur actuel
        playerScores[currentPlayerIndex]++;
        document.getElementById('feedback').textContent = `Bonne réponse ! Joueur ${currentPlayerIndex + 1} gagne un point.`;
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

    // Afficher le tableau des scores mis à jour
    updateScoreboard();

    // Passer au joueur suivant
    currentPlayerIndex = (currentPlayerIndex + 1) % numPlayers;

    // Passer à la manche suivante
    currentRound++;

    if (lives > 0 && currentRound < maxRounds) {
        setTimeout(() => {
            isAnswerSubmitted = false; // Réinitialiser le verrou pour la manche suivante
            startRound();
        }, 2000); // Délai avant la manche suivante
    } else {
        endGame(); // Terminer la partie si plus de vies ou toutes les manches jouées
    }
}

function endGame() {
    document.getElementById('letter-display').textContent = 'Partie terminée !';
    document.getElementById('player-input').disabled = true; // Désactiver l'entrée utilisateur
    document.getElementById('submit-button').disabled = true; // Désactiver le bouton
    document.getElementById('round-info').textContent = ''; // Effacer l'information des tours

    const gameContainer = document.querySelector('.game-container');

    // Efface les anciens boutons si présents
    const existingButtons = document.querySelector('.end-buttons');
    if (existingButtons) {
        existingButtons.remove();
    }

    // Conteneur pour le tableau des scores
    const scoreBoardDiv = document.createElement('div');
    scoreBoardDiv.className = 'scoreboard';
    scoreBoardDiv.style.marginTop = '20px';
    scoreBoardDiv.style.textAlign = 'center';

    // Titre du tableau des scores
    const scoreBoardTitle = document.createElement('h3');
    scoreBoardTitle.textContent = 'Tableau des scores';
    scoreBoardDiv.appendChild(scoreBoardTitle);

    // Liste des scores
    const scoreList = document.createElement('ul');
    playerScores.forEach((score, index) => {
        const scoreItem = document.createElement('li');
        scoreItem.textContent = `Joueur ${index + 1} : ${score} points`;
        scoreList.appendChild(scoreItem);
    });
    scoreBoardDiv.appendChild(scoreList);

    // Ajouter le tableau des scores au conteneur principal
    gameContainer.appendChild(scoreBoardDiv);

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

    // Résumé pour un seul joueur
    if (numPlayers === 1) {
        document.getElementById('feedback').textContent = `Votre score final est de ${currentScore} sur ${maxRounds}`;
    }
}

function resetGame(rounds) {
    resetUsedLetters(); // Réinitialiser les lettres utilisées
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


function startGame(selectedRounds) {
    resetUsedLetters(); // Réinitialiser les lettres utilisées
    maxRounds = selectedRounds;
    currentRound = 0;
    currentScore = 0;
    const useLivesInput = document.querySelector('input[name="lives-option"]:checked');
    if (!useLivesInput) {
        alert("Veuillez sélectionner une option pour les vies avant de continuer.");
        return;
    }
    const useLives = useLivesInput.value === 'with-lives';

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