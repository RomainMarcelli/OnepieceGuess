// uiHandler.js

function updateTimerDisplay() {
    document.getElementById('timer').textContent = `Temps restant : ${timeLeft}s`;
}

function startTimer() {
    clearInterval(timerInterval); // Réinitialiser tout ancien timer
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Arrêter le timer
            handleTimeout(); // Temps écoulé, gérer l'erreur
        }
    }, 1000); // Réduction du temps toutes les secondes
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

    // Filtrer les réponses valides
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

    const feedbackElement = document.getElementById('feedback');

    if (isCorrect) {
        // Ajouter un point au score du joueur actuel
        playerScores[currentPlayerIndex]++;
        feedbackElement.textContent = `Bonne réponse ! ${playerNames[currentPlayerIndex]} gagne un point.`;
        feedbackElement.className = 'feedback success'; // Ajout de la classe success

        // Animation pour le feedback
        feedbackElement.classList.add('show');
        setTimeout(() => {
            feedbackElement.classList.remove('show');
            feedbackElement.textContent = '';
        }, 1000);
    } else {
        // Réduire la vie du joueur actuel
        playerLives[currentPlayerIndex]--;
        updateHeartsDisplay(); // Mettre à jour visuellement les cœurs du joueur actuel
        updateActivePlayerLives(); // Mettre à jour l'affichage des vies du joueur actif

        // Préparer la liste des réponses valides
        const validNames = validAnswers.map((character) => {
            const aliasesText = character.aliases && character.aliases.length > 0
                ? ` (Alias : ${character.aliases.join(', ')})`
                : '';
            return `${character.name}${aliasesText}`;
        }).join(', ');

        // Modifier le feedback pour une mauvaise réponse
        feedbackElement.textContent = `Mauvaise réponse. Réponses valides : ${validNames}`;
        feedbackElement.className = 'feedback error'; // Ajout de la classe error

        // Animation pour le feedback
        feedbackElement.classList.add('show');
        setTimeout(() => {
            feedbackElement.classList.remove('show');
            feedbackElement.textContent = '';
        }, 1000);

        // Vérifier si le joueur a perdu toutes ses vies
        if (playerLives[currentPlayerIndex] <= 0) {
            feedbackElement.textContent = `${playerNames[currentPlayerIndex]} a perdu toutes ses vies !`;
            feedbackElement.className = 'feedback error';

            // Vérifier si tous les joueurs sont éliminés
            if (playerLives.every((lives) => lives <= 0)) {
                endGame(); // Terminer la partie si tous les joueurs sont éliminés
                return;
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


function updateScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    if (!scoreboard) return;
    scoreboard.innerHTML = `
        <h3>Scores</h3>
        <ul>
            ${playerScores.map((score, index) => `<li>${playerNames[index] || `Joueur ${index + 1}`} : ${score}</li>`).join('')}
        </ul>
    `;
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

// Afficher le choix de la difficulté avec animation
function showDifficultySelection() {
    const difficultySelection = document.getElementById('difficulty-selection');
    difficultySelection.style.display = 'flex'; // Afficher le conteneur
    setTimeout(() => {
        difficultySelection.style.opacity = '1'; // Lancer la transition d'opacité
    }, 100); // Légère attente pour s'assurer que "display: block" est appliqué
}

// Démarrage du jeu après la sélection des vies
document.getElementById('lives-selection').addEventListener('change', () => {
    const livesOptions = document.querySelector('input[name="lives-option"]:checked');
    if (livesOptions) {
        document.getElementById('lives-selection').style.animation = 'fadeOut 1s ease-in-out';
        setTimeout(() => {
            document.getElementById('lives-selection').style.display = 'none'; // Cacher la sélection des vies
            showDifficultySelection(); // Lancer l'affichage de la difficulté
        }, 1000); // Attendre la fin de l'animation
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.custom-dropdown');
    const selected = dropdown.querySelector('.selected-option');
    const options = dropdown.querySelectorAll('.dropdown-options li');

    // Afficher ou cacher les options au clic
    selected.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });

    // Mettre à jour le texte sélectionné
    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.textContent = option.textContent;
            dropdown.classList.remove('active'); // Cacher les options après la sélection
        });
    });

    // Fermer si on clique à l'extérieur
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const difficultyOptions = document.querySelectorAll('.difficulty-option');

    difficultyOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Retirer la classe "selected" des autres options
            difficultyOptions.forEach(opt => opt.classList.remove('selected'));

            // Ajouter la classe "selected" à l'option cliquée
            option.classList.add('selected');

            // Récupérer la valeur sélectionnée
            const selectedValue = option.getAttribute('data-value');
            console.log(`Niveau de difficulté sélectionné : ${selectedValue}`);
        });
    });
});


document.querySelectorAll('#difficulty-level li').forEach(item => {
    item.addEventListener('click', () => {
      // Retirer la classe active de tous les éléments
      document.querySelectorAll('#difficulty-level li').forEach(li => li.classList.remove('active'));
      // Ajouter la classe active à l'élément cliqué
      item.classList.add('active');
  
      // Enregistrer la difficulté sélectionnée
      difficultyLevel = item.getAttribute('data-value');
      console.log('Difficulté sélectionnée :', difficultyLevel);
    });
});

function updateLives(remainingLives) {
    const livesElement = document.getElementById('lives');

    if (!livesElement) {
        console.error("Element avec l'ID 'lives' introuvable !");
        return;
    }

    // Mettre à jour le texte
    livesElement.textContent = `Vies restantes : ${remainingLives}`;

    // Retirer l'ancienne classe avant de la réappliquer
    livesElement.classList.remove('decrease');

    // Forcer un reflow pour réinitialiser l'animation (important pour rejouer)
    void livesElement.offsetWidth;

    // Ajouter l'animation de tremblement si les vies diminuent
    livesElement.classList.add('decrease');

    // Si vous voulez un log pour déboguer :
    console.log(`Animation ajoutée pour ${remainingLives} vies restantes.`);
}


document.addEventListener('DOMContentLoaded', () => {
    const selectedOption = document.querySelector('.custom-dropdown .selected-option');
    const defaultOption = document.querySelector('.dropdown-options li[data-value="0"]');

    // Afficher par défaut la valeur de l'élément avec data-value="0"
    selectedOption.textContent = defaultOption.textContent;

    // Ajouter un gestionnaire d'événements pour changer la sélection
    const dropdownOptions = document.querySelectorAll('.dropdown-options li');
    dropdownOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectedOption.textContent = option.textContent;
            selectedOption.dataset.value = option.dataset.value; // Optionnel, pour gérer les données
        });
    });
});


