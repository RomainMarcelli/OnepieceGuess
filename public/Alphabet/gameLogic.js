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

function updateLivesDisplay() {
    const livesElement = document.getElementById('lives');
    livesElement.textContent = `Vies restantes pour ${playerNames[currentPlayerIndex]} : ${playerLives[currentPlayerIndex]}`;
}

function startRound() {
    console.log(`Début du round ${currentRound + 1}/${maxRounds}`);

    if (currentRound === 0) {
        startTime = Date.now(); // Enregistrer l'heure de début de la partie
        console.log("Début de la partie");
    }

    // Vérifier si le jeu doit se terminer
    if (currentRound >= totalRounds) {
        endGame();
        return;
    }

    // Déterminer le joueur actuel
    currentPlayerIndex = currentRound % numPlayers; // Alterne entre les joueurs
    const roundsPlayedByPlayer = Math.floor(currentRound / numPlayers) + 1; // Rounds joués par le joueur actuel
    const playerRoundIndex = Math.floor(currentRound / numPlayers); // Round actuel pour ce joueur
    currentPlayerIndex = currentRound % numPlayers; // Alterner entre les joueurs

    // Afficher le joueur actuel
    document.getElementById('current-player').textContent = `Au tour de : ${playerNames[currentPlayerIndex]}`;

    // Nouvelle lettre aléatoire
    currentLetter = getRandomLetter();
    console.log(`Lettre choisie pour ce round : ${currentLetter}`);
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

    updateLivesDisplay()

    updateTimerDisplay(); // Mettre à jour l'affichage initial du timer
    startTimer(); // Démarrer le compte à rebours 

    // Incrémenter le compteur des rounds
    currentRound++;
    console.log(`Fin de l'initialisation du round ${currentRound}`);
}

function checkAnswer() {
    if (isAnswerSubmitted) {
        return; // Empêcher les exécutions multiples
    }
    isAnswerSubmitted = true; // Activer le verrou

    clearInterval(timerInterval); // Arrêter le timer pour éviter tout conflit
    const playerInput = document.getElementById('player-input').value.trim().toLowerCase();

    // Vérifier si les données `playerScores` et `playerNames` sont bien initialisées
    if (!playerScores || playerScores.length === 0) {
        playerScores = Array(numPlayers).fill(0); // Initialiser les scores à 0 pour chaque joueur
    }
    if (!playerNames || playerNames.length === 0) {
        playerNames = Array.from({ length: numPlayers }, (_, i) => `Joueur ${i + 1}`); // Initialiser les noms par défaut
    }    

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
        const feedbackElement = document.getElementById('feedback');
    
        // Modifier le feedback
        feedbackElement.textContent = `Bonne réponse ! ${playerNames[currentPlayerIndex]} gagne un point.`;
        feedbackElement.className = 'feedback success'; // Ajout de la classe success
    
        // Afficher le feedback avec animation
        feedbackElement.classList.add('show');
        setTimeout(() => {
            feedbackElement.classList.remove('show'); // Retirer l'animation après 1s
            feedbackElement.textContent = ''; // Effacer le contenu du feedback
        }, 1000); // Ajuster la durée selon vos besoins
    } else {
        lives--; // Réduire une vie
        document.getElementById('lives').textContent = `Vies restantes : ${lives}`;
    
        const validNames = validAnswers.map((character) => {
            const aliasesText = character.aliases && character.aliases.length > 0
                ? ` (Alias : ${character.aliases.join(', ')})`
                : '';
            return `${character.name}${aliasesText}`;
        }).join(', ');
    
        const feedbackElement = document.getElementById('feedback');
    
        // Modifier le feedback pour une mauvaise réponse
        feedbackElement.textContent = `Mauvaise réponse. Réponses valides : ${validNames}`;
        feedbackElement.className = 'feedback error'; // Ajout de la classe error
    
        // Afficher le feedback avec animation
        feedbackElement.classList.add('show');
        setTimeout(() => {
            feedbackElement.classList.remove('show'); // Retirer l'animation après 1s
            feedbackElement.textContent = ''; // Effacer le contenu du feedback
        }, 1000); // Ajuster la durée selon vos besoins
    
        if (lives <= 0) {
            endGame(); // Terminer immédiatement si les vies sont épuisées
            return;
        }    
        if (!isCorrect) {
            playerLives[currentPlayerIndex]--; // Réduire la vie du joueur actuel
            document.getElementById('lives').textContent = `Vies restantes pour ${playerNames[currentPlayerIndex]} : ${playerLives[currentPlayerIndex]}`;
        
            if (playerLives[currentPlayerIndex] <= 0) {
                const feedbackElement = document.getElementById('feedback');
                feedbackElement.textContent = `${playerNames[currentPlayerIndex]} a perdu toutes ses vies !`;
                feedbackElement.className = 'feedback error';
        
                // Vérifier si tous les joueurs sont éliminés
                if (playerLives.every((lives) => lives <= 0)) {
                    endGame(); // Terminer la partie si tous les joueurs sont éliminés
                    return;
                }
            }
        }
    }    

    // Afficher le tableau des scores mis à jour
    updateScoreboard();

    // Passer au round suivant
    if (currentRound < totalRounds) {
        setTimeout(() => {
            isAnswerSubmitted = false; // Réinitialiser le verrou pour la manche suivante
            startRound();
        }, 2000); // Délai avant la manche suivante
    } else {
        endGame(); // Terminer la partie si toutes les manches jouées
    }       
}

function endGame() {
    document.getElementById('letter-display').textContent = 'Partie terminée !';
    document.getElementById('player-input').disabled = true; // Désactiver l'entrée utilisateur
    document.getElementById('submit-button').disabled = true; // Désactiver le bouton
    document.getElementById('round-info').textContent = ''; // Effacer l'information des tours

    // Supprimer le message de feedback
    document.getElementById('feedback').textContent = '';

    const gameContainer = document.querySelector('.game-container');

    // Efface les anciens boutons ou éléments similaires si présents
    const existingButtons = document.querySelector('.end-buttons');
    const existingScoreboard = document.querySelector('.scoreboard');
    if (existingButtons) existingButtons.remove();
    if (existingScoreboard) existingScoreboard.remove();

    // Conteneur pour le tableau des scores
    const scoreBoardDiv = document.createElement('div');
    scoreBoardDiv.className = 'scoreboard';

    const scoreBoardTitle = document.createElement('h3');
    scoreBoardTitle.textContent = 'Tableau des scores';
    scoreBoardDiv.appendChild(scoreBoardTitle);

    // Liste des scores
    const scoreList = document.createElement('ul');
    playerScores.forEach((score, index) => {
        const playerName = playerNames[index] || `Joueur ${index + 1}`;
        const validScore = isNaN(score) ? 0 : score;
        const scoreItem = document.createElement('li');
        scoreItem.textContent = `${playerName} : ${validScore} points`;
        scoreList.appendChild(scoreItem);
    });
    scoreBoardDiv.appendChild(scoreList);

    // Ajouter le tableau des scores au conteneur principal
    gameContainer.appendChild(scoreBoardDiv);

    // Trouver le(s) joueur(s) avec le meilleur score
    const maxScore = Math.max(...playerScores);
    const bestPlayers = playerScores.reduce((acc, score, index) => {
        if (score === maxScore) {
            acc.push(playerNames[index] || `Joueur ${index + 1}`);
        }
        return acc;
    }, []);

    // Message d'encouragement basé sur les performances
    const encouragementMessage = document.createElement('p');
    encouragementMessage.className = 'encouragement-message';
    if (bestPlayers.length > 1) {
        encouragementMessage.textContent = `Bravo à ${bestPlayers.join(' et ')} pour le meilleur score de ${maxScore} points !`;
    } else {
        encouragementMessage.textContent = `Bravo à ${bestPlayers[0]} pour le meilleur score de ${maxScore} points !`;
    }
    gameContainer.appendChild(encouragementMessage);

    // Conteneur pour les options de fin
    const endButtonsDiv = document.createElement('div');
    endButtonsDiv.className = 'end-buttons';

    // **Ajout de l'élément `roundSelect`**
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
    restartButton.className = 'end-button restart';
    restartButton.textContent = 'Recommencer';

    // Correction : Utiliser `roundSelect` correctement ici
    restartButton.addEventListener('click', () => {
        const newRounds = parseInt(roundSelect.value, 10);
        resetGame(newRounds); // Recommence avec le nombre de rounds sélectionné
    });

    // Bouton pour exporter les scores
    const exportButton = document.createElement('button');
    exportButton.className = 'end-button export';
    exportButton.textContent = 'Exporter les scores';
    exportButton.addEventListener('click', () => {
        const scoreData = playerScores.map((score, index) => {
            const playerName = playerNames[index] || `Joueur ${index + 1}`;
            return `${playerName} : ${score || 0} points`;
        }).join('\n');
        const blob = new Blob([scoreData], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'scores.txt';
        link.click();
    });

    // Ajouter le sélecteur et les boutons au conteneur
    endButtonsDiv.appendChild(roundSelect);
    endButtonsDiv.appendChild(restartButton);
    endButtonsDiv.appendChild(exportButton);

    gameContainer.appendChild(endButtonsDiv);
}

function resetGame(rounds) {
    resetUsedLetters(); // Réinitialiser les lettres utilisées
    currentRound = 0;
    maxRounds = rounds;
    currentScore = 0;
    lives = 3; // Réinitialiser les vies

    // Réinitialiser l'affichage des vies
    const livesElement = document.getElementById('lives');
    if (livesElement) {
        livesElement.textContent = `Vies restantes : ${lives}`;
    }

    // Réinitialiser le champ d'entrée utilisateur
    const playerInput = document.getElementById('player-input');
    if (playerInput) {
        playerInput.value = ''; // Vider le champ de saisie
        playerInput.disabled = false; // Réactiver le champ de saisie
    }

    // Réactiver le bouton de soumission
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.disabled = false; // Réactiver le bouton
    }

    // Réinitialiser le score si l'élément existe
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = `Score : 0`;
    }

    // Supprimer les anciens éléments du tableau des scores
    const existingScoreboard = document.querySelector('.scoreboard');
    if (existingScoreboard) {
        existingScoreboard.remove();
    }

    // Supprimer le message d'encouragement
    const encouragementMessage = document.querySelector('.encouragement-message');
    if (encouragementMessage) {
        encouragementMessage.remove();
    }

    // Supprimer les boutons de fin de partie si présents
    const endButtons = document.querySelector('.end-buttons');
    if (endButtons) {
        endButtons.remove();
    }

    // Réinitialiser le feedback
    const feedbackElement = document.getElementById('feedback');
    if (feedbackElement) {
        feedbackElement.textContent = '';
    }

    startRound(); // Démarrer une nouvelle partie
}

function startGame(selectedRounds) {
    console.log("Démarrage du jeu");
    resetUsedLetters(); // Réinitialiser les lettres utilisées
    const roundsPerPlayer = selectedRounds; // Rounds par joueur
    maxRounds = selectedRounds * numPlayers; // Total des rounds pour tous les joueurs
    currentRound = 0;
    currentScore = 0;

    console.log(`Configuration du jeu : ${numPlayers} joueurs, ${roundsPerPlayer} rounds par joueur, ${maxRounds} rounds au total.`);

    // Vérifier si les noms des joueurs sont définis
    if (!playerNames || playerNames.length !== numPlayers) {
        alert("Veuillez entrer les noms pour tous les joueurs avant de continuer.");
        console.log("Noms des joueurs non définis !");
        return;
    }

    const useLivesInput = document.querySelector('input[name="lives-option"]:checked');
    if (!useLivesInput) {
        alert("Veuillez sélectionner une option pour les vies avant de continuer.");
        console.log("Option des vies non sélectionnée !");
        return;
    }
    const useLives = useLivesInput.value === 'with-lives';

    lives = useLives ? 3 : Infinity; // Initialiser les vies
    document.getElementById('lives').style.display = useLives ? 'block' : 'none';
    document.getElementById('lives').textContent = `Vies restantes : ${lives}`;

    // Masquer la sélection des rounds avec une animation
    const roundSelection = document.getElementById('round-selection');
    roundSelection.style.animation = 'fadeOut 1s ease-in-out';

    // Attendre la fin de l'animation avant de commencer le jeu
    setTimeout(() => {
        roundSelection.style.display = 'none';
        document.getElementById('game').style.display = 'block'; // Afficher le jeu
        document.getElementById('current-player').style.display = 'block'; // Afficher le joueur actuel
        startRound(); // Démarrer le premier tour
    }, 1000);
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