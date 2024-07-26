let characterName = '';
let incorrectGuesses = [];
// let attempts = 0;
let fruitType = ''; // Ajout pour stocker le type de fruit

async function fetchDevilFruit() {
    try {
        const response = await fetch('/api/random-devil-fruit');
        const data = await response.json();
        
        // Filtrer pour éviter d'afficher "Aucun"
        while (data.fruit === 'Aucun') {
            const retryResponse = await fetch('/api/random-devil-fruit');
            const retryData = await retryResponse.json();
            if (retryData.fruit !== 'Aucun') {
                data.fruit = retryData.fruit;
                data.character = retryData.character;
                data.type = retryData.type; // Ajout de type
                break;
            }
        }

        document.getElementById('devil-fruit').innerText = `❝ ${data.fruit} ❞`;
        characterName = data.character;
        fruitType = data.type; // Stockage du type de fruit
        attempts = 0;
        updateHintInfo(); // Met à jour les indices au début du jeu

    } catch (error) {
        console.error('Erreur:', error);
    }
}

function checkGuess(event) {
    event.preventDefault();
    const inputElement = document.getElementById('characterInput');
    const guess = inputElement.value.trim();
    const resultElement = document.getElementById('result');
    
    // Clear previous result message
    resultElement.innerText = '';

    attempts++;

    if (guess.toLowerCase() === characterName.toLowerCase()) {
        // Display the correct character details
        displayCharacterDetails(characterName);
        // Display the success card
        displaySuccessCard(characterName);
    } else {
        // Add incorrect guess and update the list
        incorrectGuesses.push(guess);
        updateIncorrectGuesses();
    }

    // Clear the input field
    inputElement.value = '';
    updateHintInfo(); // Met à jour les indices après chaque essai
}

function getImagePath(name) {
    return `img/${name}.png`;  // Assumes images are named exactly as the character names with a .png extension
}

function updateIncorrectGuesses() {
    const container = document.getElementById('resultFruitContainer');
    
    // Ensure that previous incorrect guesses are retained
    container.querySelectorAll('.incorrect-guess').forEach(el => el.remove());
    
    incorrectGuesses.forEach(guess => {
        const guessElement = document.createElement('div');
        guessElement.classList.add('incorrect-guess');
        
        const img = document.createElement('img');
        img.src = getImagePath(guess);
        img.alt = 'Character Image';
        img.className = 'suggestion-image';

        const nameSpan = document.createElement('span');
        nameSpan.innerText = guess;

        guessElement.appendChild(img);
        guessElement.appendChild(nameSpan);
        container.appendChild(guessElement);
    });
}

function displayCharacterDetails(name) {
    const container = document.getElementById('resultFruitContainer');

    // Create and display the correct guess details
    const characterElement = document.createElement('div');
    characterElement.classList.add('correct-guess');

    const img = document.createElement('img');
    img.src = getImagePath(name);
    img.alt = 'Character Image';
    img.className = 'character-image';

    const nameSpan = document.createElement('span');
    nameSpan.innerText = name;
    nameSpan.className = 'character-name';

    characterElement.appendChild(img);
    characterElement.appendChild(nameSpan);

    // Append the correct guess at the end of the container
    container.appendChild(characterElement);
}

function displaySuccessCard(characterName) {
    // Supprimer la carte de succès existante s'il y en a une
    const existingSuccessCard = document.querySelector('.success-card');
    if (existingSuccessCard) {
        existingSuccessCard.remove();
    }

    const successCard = document.createElement('div');
    successCard.className = 'success-card';

    const successTitle = document.createElement('h2');
    successTitle.textContent = 'Bravo!';
    successCard.appendChild(successTitle);

    // Création d'un conteneur pour le nom et l'image du personnage
    const characterContainer = document.createElement('div');
    characterContainer.className = 'character-container';

    // Création de l'image du personnage
    const characterImage = document.createElement('img');
    characterImage.src = getImagePath(characterName);
    characterImage.alt = 'Character Image';
    characterImage.className = 'character-image';

    // Création du nom du personnage
    const nameSpan = document.createElement('span');
    nameSpan.className = 'character-name';
    nameSpan.textContent = characterName;

    // Ajout de l'image et du nom au conteneur
    characterContainer.appendChild(characterImage);
    characterContainer.appendChild(nameSpan);

    // Ajout du conteneur à la carte de succès
    successCard.appendChild(characterContainer);

    const attemptsMessage = document.createElement('p');
    attemptsMessage.textContent = `Nombre d'essais réalisés : ${attempts}`;
    successCard.appendChild(attemptsMessage);

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Recommencer la partie';
    restartButton.addEventListener('click', () => {
        restartGame(); // Appel de restartGame pour réinitialiser le jeu
    });
    successCard.appendChild(restartButton);

    document.body.appendChild(successCard);

    // Défilement vers la carte de succès
    successCard.scrollIntoView({ behavior: 'smooth' });
}

function restartGame() {
    document.getElementById('characterInput').value = '';
    document.getElementById('result').innerText = '';
    incorrectGuesses = [];
    document.getElementById('resultFruitContainer').innerHTML = '';
    fetchDevilFruit();
    updateHintInfo(); // Réinitialiser l'indice lors du redémarrage du jeu
}

// Fonction pour mettre à jour les indices
function updateHintInfo() {
    const hintInfoElement = document.getElementById('typeHintInfo'); // Élément pour afficher l'indice du type
    if (attempts >= 4 && hintInfoElement) {
        hintInfoElement.innerText = `Type de fruit : ${fruitType}`;
        hintInfoElement.style.display = 'block';
    } else if (hintInfoElement) {
        hintInfoElement.style.display = 'none';
    }
}

// Fetch a random devil fruit when the page loads
window.onload = fetchDevilFruit;

document.getElementById('guessFruitForm').addEventListener('submit', checkGuess);
