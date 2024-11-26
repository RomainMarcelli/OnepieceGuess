// Variables de jeu
let selectedCharacter;
let currentHintIndex = 0;
const hintsOrder = ['gender', 'affiliation', 'devilFruit', 'haki', 'bounty', 'height', 'firstArc'];

// Initialiser un personnage aléatoire
function initializeGame() {
    selectedCharacter = characters[Math.floor(Math.random() * characters.length)];
    currentHintIndex = 0;
    document.getElementById('current-hint').textContent = '';
    document.getElementById('result').textContent = '';
    document.getElementById('guessForm').style.display = 'block';
    document.getElementById('restartGame').style.display = 'none';
    showNextHint();
}

// Afficher l'indice suivant
function showNextHint() {
    if (currentHintIndex < hintsOrder.length) {
        const hintKey = hintsOrder[currentHintIndex];
        const hintValue = selectedCharacter[hintKey];
        document.getElementById('current-hint').textContent = `${hintKey.charAt(0).toUpperCase() + hintKey.slice(1)} : ${hintValue}`;
        currentHintIndex++;
    } else {
        document.getElementById('current-hint').textContent = "Tous les indices ont été donnés !";
        endGame(false);
    }
}

// Vérifier la réponse de l'utilisateur
function checkGuess(event) {
    event.preventDefault();
    const userGuess = document.getElementById('guessInput').value.trim().toLowerCase();
    const result = document.getElementById('result');

    if (userGuess === selectedCharacter.name.toLowerCase()) {
        result.textContent = `Bravo ! Vous avez deviné : ${selectedCharacter.name}`;
        result.style.color = 'green';
        endGame(true);
    } else {
        result.textContent = `Incorrect ! Essayez encore.`;
        result.style.color = 'red';
        showNextHint();
    }

    document.getElementById('guessInput').value = '';
}

// Terminer la partie
function endGame(success) {
    document.getElementById('guessForm').style.display = 'none';
    document.getElementById('restartGame').style.display = 'block';
    if (!success) {
        document.getElementById('result').textContent = `Vous avez perdu ! Le personnage était ${selectedCharacter.name}`;
        document.getElementById('result').style.color = 'red';
    }
}

function updateSuggestions() {
    const input = document.getElementById('guessInput');
    const suggestions = document.getElementById('characterSuggestions');
    const searchText = input.value.toLowerCase();

    console.log('Texte recherché:', searchText); // Débogage

    if (!characters || characters.length === 0) {
        console.error('La liste des personnages est vide ou non définie.');
        return;
    }

    const filteredCharacters = characters.filter(character => 
        character.name.toLowerCase().startsWith(searchText)
    );

    console.log('Personnages filtrés:', filteredCharacters); // Débogage

    suggestions.innerHTML = '';

    filteredCharacters.forEach(character => {
        const option = document.createElement('option');
        option.value = character.name;
        suggestions.appendChild(option);
    });

    console.log('Suggestions mises à jour:', suggestions.innerHTML); // Débogage
}


// Écouteurs d'événements
document.getElementById('guessForm').addEventListener('submit', checkGuess);
document.getElementById('restartGame').addEventListener('click', initializeGame);
document.getElementById('guessInput').addEventListener('input', updateSuggestions);

// Lancer le jeu au chargement
initializeGame();
