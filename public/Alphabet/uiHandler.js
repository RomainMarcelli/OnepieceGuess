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

function handleTimeout() {
    document.getElementById('feedback').textContent = 'Temps écoulé ! Mauvaise réponse.';
    document.getElementById('feedback').style.color = 'red';

    // Réduire une vie si le mode avec vies est actif
    const useLives = document.querySelector('input[name="lives-option"]:checked').value === 'with-lives';
    if (useLives) {
        lives--;
        document.getElementById('lives').textContent = `Vies restantes : ${lives}`;
    }

    // Passer à la manche suivante
    currentRound++;

    // Réinitialiser le verrou pour la prochaine manche
    isAnswerSubmitted = false;

    if (lives > 0 && currentRound < maxRounds) {
        setTimeout(startRound, 2000); // Délai avant la manche suivante
    } else {
        endGame(); // Terminer la partie si plus de vies ou toutes les manches jouées
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
    difficultySelection.style.display = 'block'; // Afficher le conteneur
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
