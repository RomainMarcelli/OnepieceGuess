let selectedCharacter = null;
const history = []; // Array to keep track of character choices
let devilFruits = []; // Array to store devil fruits
let attempts = 0; 
  // Variable pour stocker les suggestions actuelles

const arcsChronologiques = [
    "Romance Dawn",
    'Orange Town',
    "Syrup Village",
    "Baratie",
    "Arlong Park",
    "Loguetown",
    "Reverse Mountain",
    "Whisky Peak",
    "Little Garden",
    "Drum Island",
    "Alabasta",
    "Jaya",
    "Skypiea",
    "Water 7",
    "Enies Lobby",
    "Thriller Bark",
    "Sabaody Archipelago",
    "Amazon Lily",
    "Impel Down",
    "Marineford",
    "Post-War",
    "Fishman Island",
    "Punk Hazard",
    "Dressrosa",
    "Zou",
    "Whole Cake Island",
    "Film Red",
    "Wano",
    "Egg Head"
];

document.addEventListener('DOMContentLoaded', () => {
    // Redirection sur clic des images
    document.querySelector('.guessPerso img').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.querySelector('.devilFruit img').addEventListener('click', () => {
        window.location.href = 'devilfruit.html';
    });

    // Appliquer le filtre CSS sur l'image active
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'index.html') {
        document.querySelector('.guessPerso img').style.filter = 'drop-shadow(0 0 10px #faf9f3)';
    } else if (currentPage === 'devilfruit.html') {
        document.querySelector('.devilFruit img').style.filter = 'drop-shadow(0 0 10px #faf9f3)';
    }
});


document.getElementById('restartGameButton').addEventListener('click', async () => {
    await startNewGame();
    resetGame();
});

document.getElementById('characterInput').addEventListener('input', async (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        try {
            const response = await fetch(`/api/search?q=${query}`);
            if (response.ok) {
                const suggestions = await response.json();
                displaySuggestions(suggestions);
            } else {
                console.error('Error fetching suggestions:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    } else {
        document.getElementById('suggestions').innerHTML = '';
    }
});

let currentSuggestions = [];
let selectedCharacters = [];

function getImagePath(characterName) {
    return `public/img/${characterName}.png`;
}

function displaySuggestions(suggestions) {
    // Mettre à jour les suggestions actuelles
    currentSuggestions = suggestions;

    const input = document.getElementById('characterInput').value.trim().toLowerCase();

    // Filtrer les suggestions pour exclure les personnages déjà sélectionnés
    // et pour ne garder que ceux dont le nom commence par la lettre saisie
    const filteredSuggestions = suggestions.filter(suggestion => 
        !selectedCharacters.includes(suggestion.name) &&
        suggestion.name.toLowerCase().startsWith(input)
    );

    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    if (filteredSuggestions.length > 0) {
        filteredSuggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.className = 'suggestion';

            // Ajouter l'image du personnage
            const img = document.createElement('img');
            img.src = getImagePath(suggestion.name);
            img.alt = 'Character Image';
            img.className = 'suggestion-image';

            // Ajouter le nom du personnage directement à droite de l'image
            const nameLabel = document.createElement('span');
            nameLabel.className = 'character-names-label';
            nameLabel.textContent = suggestion.name;

            // Ajouter un événement de clic
            div.addEventListener('click', () => {
                document.getElementById('characterInput').value = suggestion.name; // Mettre à jour le champ de saisie avec la suggestion
                selectedCharacters.push(suggestion.name); // Ajouter le personnage à la liste des sélectionnés

                // Mettre à jour currentSuggestions après sélection
                currentSuggestions = currentSuggestions.filter(item => item.name !== suggestion.name);

                displaySuggestions(currentSuggestions); // Re-render les suggestions après sélection
                suggestionsDiv.style.display = 'none'; // Masquer la barre de suggestion
            });

            div.appendChild(img); // Ajouter l'image au div
            div.appendChild(nameLabel); // Ajouter le nom au div
            suggestionsDiv.appendChild(div); // Ajouter le div complet à la barre de suggestion
        });
        suggestionsDiv.style.display = 'block'; // Afficher la barre de suggestion si des suggestions existent
    } else {
        suggestionsDiv.style.display = 'none'; // Masquer la barre de suggestion si aucune suggestion
    }
}

// Ajouter un écouteur d'événement pour le champ de saisie
document.getElementById('characterInput').addEventListener('input', () => {
    displaySuggestions(currentSuggestions);
})



function removeSuggestion(name) {
    currentSuggestions = currentSuggestions.filter(suggestion => suggestion.name !== name);
}

// Événement 'input' pour la recherche de suggestions
document.getElementById('characterInput').addEventListener('input', async (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        try {
            const response = await fetch(`/api/search?q=${query}`);
            if (response.ok) {
                const suggestions = await response.json();
                displaySuggestions(suggestions); // Afficher les suggestions filtrées
            } else {
                console.error('Error fetching suggestions:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    } else {
        const suggestionsDiv = document.getElementById('suggestions');
        suggestionsDiv.innerHTML = '';
        suggestionsDiv.style.display = 'none'; // Masquer la barre de suggestion si le champ est vide
    }
});

function updateHintInfo() {
    const firstArcHintInfo = document.getElementById('firstArcHintInfo');
    const devilFruitHintInfo = document.getElementById('devilFruitHintInfo');
    const firstArcHintImage = document.getElementById('firstArcHintImage');
    const devilFruitHintImage = document.getElementById('devilFruitHintImage');
    const firstArcHint = document.querySelector('#firstArcHint');
    const devilFruitHint = document.querySelector('#devilFruitHint');
    const firstArcHintP = document.querySelector('#firstArcHint p');
    const devilFruitHintP = document.querySelector('#devilFruitHint p');

    const attemptsForFirstArcHint = 6; // Affichage au bout de 2 essais
    const attemptsForDevilFruitHint = 9; // Affichage au bout de 3 essais

    const remainingAttemptsForFirstArcHint = Math.max(0, attemptsForFirstArcHint - attempts);
    const remainingAttemptsForDevilFruitHint = Math.max(0, attemptsForDevilFruitHint - attempts);

    if (remainingAttemptsForFirstArcHint > 0) {
        firstArcHintInfo.textContent = `Dans ${remainingAttemptsForFirstArcHint} Essais`;
        firstArcHintInfo.style.display = 'block';
        // Réinitialiser le filtre si les essais ne sont pas atteints
        firstArcHintImage.style.filter = '';
    } else {
        firstArcHintInfo.textContent = `Indice du premier arc : ${selectedCharacter.firstArc}`;
        firstArcHintInfo.style.display = 'none';
        // Appliquer le filtre après avoir atteint le nombre d'essais
        firstArcHint.style.border = '2px solid #928157';
        firstArcHintP.style.color = '#928157'; 
        firstArcHintImage.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(60%) saturate(2369%) hue-rotate(353deg) brightness(100%) contrast(102%)';
    }

    if (remainingAttemptsForDevilFruitHint > 0) {
        devilFruitHintInfo.textContent = `Dans ${remainingAttemptsForDevilFruitHint} Essais`;
        devilFruitHintInfo.style.display = 'block';
        // Réinitialiser le filtre si les essais ne sont pas atteints
        devilFruitHintImage.style.filter = '';
    } else {
        devilFruitHintInfo.textContent = `Indice du fruit du démon : ${selectedCharacter.devilFruit}`;
        devilFruitHintInfo.style.display = 'none';
        // Appliquer le filtre après avoir atteint le nombre d'essais
        devilFruitHint.style.border = '2px solid #928157';
        devilFruitHintP.style.color = '#928157';
        devilFruitHintImage.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(60%) saturate(2369%) hue-rotate(353deg) brightness(100%) contrast(102%)';
    }
}

function toggleHint(id) {
    const firstArcHintDisplay = document.getElementById('firstArcHintDisplay');
    const devilFruitHintDisplay = document.getElementById('devilFruitHintDisplay');

    if (id === 'firstArcHintDisplay') {
        if (attempts < 6) {
            return;
        }

        if (firstArcHintDisplay.style.display === 'none' || firstArcHintDisplay.style.display === '') {
            devilFruitHintDisplay.style.display = 'none';
            firstArcHintDisplay.innerHTML = `Indice du premier arc : ${selectedCharacter.firstArc}`;
            firstArcHintDisplay.style.display = 'block';
        } else {
            firstArcHintDisplay.style.display = 'none';
        }
    } else if (id === 'devilFruitHintDisplay') {
        if (attempts < 9) {
            return;
        }

        if (devilFruitHintDisplay.style.display === 'none' || devilFruitHintDisplay.style.display === '') {
            firstArcHintDisplay.style.display = 'none';
            devilFruitHintDisplay.innerHTML = `Indice du fruit du démon : ${selectedCharacter.devilFruit}`;
            devilFruitHintDisplay.style.display = 'block';
        } else {
            devilFruitHintDisplay.style.display = 'none';
        }
    }
}

// Fonction pour gérer les indices en fonction des essais
function updateHints() {
    // Met à jour les indices en fonction des essais
    updateHintInfo();
}

// Écouteur d'événements pour le formulaire de soumission
document.getElementById('guessForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const guessedCharacterName = document.getElementById('characterInput').value;
    attempts++;
    
    try {
        const response = await fetch('/api/characters');
        if (response.ok) {
            const allCharacters = await response.json();
            const guessedCharacter = allCharacters.find(character => character.name === guessedCharacterName);

            if (guessedCharacter) {
                guessedCharacter.correct = guessedCharacter.name === selectedCharacter.name;
                history.push(guessedCharacter);
                displayResult(guessedCharacter, selectedCharacter);
                updateHistory();

                document.getElementById('characterInput').value = '';
                const suggestionsDiv = document.getElementById('suggestions');
                suggestionsDiv.innerHTML = '';
                suggestionsDiv.style.display = 'none';
            } else {
                alert('Character not found!');
            }
        } else {
            console.error('Error fetching characters:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
    
    // Met à jour les indices en fonction du nombre d'essais
    updateHints();
});

// Événements pour afficher ou cacher les indices
document.getElementById('firstArcHint').addEventListener('click', () => {
    toggleHint('firstArcHintDisplay');
});

document.getElementById('devilFruitHint').addEventListener('click', () => {
    toggleHint('devilFruitHintDisplay');
});


async function startNewGame() {
    resetGame();    
    try {
        const response = await fetch('/api/start-game');
        if (response.ok) {
            selectedCharacter = await response.json();
            document.getElementById('restartGameButton').style.display = 'block';
            resetGame(); // Clear previous results and suggestions
        } else {
            console.error('Error starting new game:', response.statusText);
        }
    } catch (error) {
        console.error('Error starting new game:', error);
    }
}

function resetGame() {
    // Réinitialiser les essais
    attempts = 0;

    // Réinitialiser les autres éléments de jeu comme le conteneur de résultats
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';

    // Supprimer la carte de succès existante s'il y en a une
    const existingSuccessCard = document.querySelector('.success-card');
    if (existingSuccessCard) {
        existingSuccessCard.remove();
    }

    // Cacher le bouton de redémarrage
    const restartGameButton = document.getElementById('restartGameButton');
    if (restartGameButton) {
        restartGameButton.style.display = 'none';
    }

    // Réinitialiser d'autres éléments nécessaires pour le nouveau jeu
    document.getElementById('resultContainer').innerHTML = '';
    document.getElementById('characterInput').value = '';
    document.getElementById('suggestions').innerHTML = '';
    document.getElementById('characterImageContainer').style.display = 'none';
    document.getElementById('characterImage').src = '';
}


// Fonction pour récupérer les images des Haki depuis le serveur
async function fetchHakiImages() {
    try {
        const response = await fetch('/api/haki-images');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching haki images:', error);
        return {}; // Retourne un objet vide en cas d'erreur
    }
}

function compareValues(correctValue, guessedValue) {
    if (!correctValue || !guessedValue) return '';
    const correctNumber = parseFloat(correctValue.replace(/[^0-9.]/g, ''));
    const guessedNumber = parseFloat(guessedValue.replace(/[^0-9.]/g, ''));

    if (guessedNumber < correctNumber) {
        return 'arrow-down'; // Retourne la classe pour flèche vers le bas
    } else if (guessedNumber > correctNumber) {
        return 'arrow-up'; // Retourne la classe pour flèche vers le haut
    }
    return '';
}

function compareArcs(correctArc, guessedArc) {
    const indexCorrect = arcsChronologiques.indexOf(correctArc);
    const indexGuessed = arcsChronologiques.indexOf(guessedArc);

    // Debugging logs
    console.log(`Correct Arc: ${correctArc}, Guessed Arc: ${guessedArc}`);
    console.log(`Index Correct: ${indexCorrect}, Index Guessed: ${indexGuessed}`);

    // Vérifier si les arcs sont valides
    if (indexGuessed === -1 || indexCorrect === -1) {
        console.warn(`Arc not found in list: ${correctArc} or ${guessedArc}`);
        return ''; // Arc non trouvé
    }

    // Comparer les indices pour déterminer la direction des flèches
    if (indexGuessed < indexCorrect) {
        // L'arc deviné est avant l'arc correct dans la liste
        console.log('Returning arrow-down');
        return 'arrow-down'; // Flèche vers le bas (plus proche)
    } else if (indexGuessed > indexCorrect) {
        // L'arc deviné est après l'arc correct dans la liste
        console.log('Returning arrow-up');
        return 'arrow-up'; // Flèche vers le haut (plus éloigné)
    }

    // Les arcs sont identiques
    console.log('Arcs are the same, no arrow');
    return ''; // Les arcs sont les mêmes
}


function formatBounty(bounty) {
    if (!bounty) return 'Aucun';

    // Nettoyer la valeur de la prime pour supprimer tout caractère non numérique
    const num = parseFloat(bounty.replace(/[^0-9.]/g, ''));

    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + ' Md'; // Formater en milliards
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + ' M'; // Formater en millions
    }

    return num.toLocaleString(); // Format avec séparation des milliers
}

function formatHaki(haki) {
    if (!haki) return 'Aucun';
    const hakiTypes = haki.split(',').map(type => type.trim());
    return hakiTypes.length > 0 ? hakiTypes.join(', ') : 'Aucun';
}


function categorizeDevilFruit(devilFruit) {
    const fruit = devilFruits.find(f => f.name === devilFruit);
    return fruit ? fruit.type : 'Aucun';
}

async function fetchDevilFruits() {
    try {
        const response = await fetch('/api/devil-fruits');
        if (response.ok) {
            devilFruits = await response.json();
            console.log('Fetched devil fruits:', devilFruits); // Log to verify devil fruits are fetched correctly
        } else {
            console.error('Error fetching devil fruits:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching devil fruits:', error);
    }
}

function updateHistory() {
    const historyDiv = document.getElementById('history');
    if (!historyDiv) {
        console.error('Element with id "history" not found.');
        return;
    }

    historyDiv.innerHTML = ''; // Clear previous history

    history.forEach(character => {
        const div = document.createElement('div');
        div.className = 'history';

        const fields = [
            { key: 'name', label: 'Nom' },
            { key: 'devilFruit', label: 'Fruit du Démon', categorize: true },
            { key: 'haki', label: 'Haki' }, // Nouvelle case ajoutée
            { key: 'affiliation', label: 'Affiliation' },
            { key: 'height', label: 'Taille' },
            { key: 'gender', label: 'Genre' },
            { key: 'bounty', label: 'Prime' }
        ];

        fields.forEach(field => {
            const itemDiv = document.createElement('div');
            const value = field.key === 'devilFruit' ? categorizeDevilFruit(character[field.key]) : character[field.key];
            itemDiv.textContent = `${field.label}: ${value || 'Aucun'}`;
            itemDiv.className = `history-item ${getResultClass(character, selectedCharacter, field)}`;
            div.appendChild(itemDiv);
        });

        historyDiv.appendChild(div);
    });
}

async function displayResult(guessedCharacter, selectedCharacter) {
    const hakiImages = await fetchHakiImages();

    const resultContainer = document.getElementById('resultContainer');

    const fields = [
        { key: 'name', label: 'Nom' },
        { key: 'gender', label: 'Genre' },
        { key: 'affiliation', label: 'Affiliation' },
        { key: 'devilFruit', label: 'Fruit du Démon' },
        { key: 'haki', label: 'Haki' },
        { key: 'bounty', label: 'Prime', type: 'bounty' },
        { key: 'height', label: 'Taille', type: 'height' },
        { key: 'firstArc', label: 'Premier Arc', type: 'firstArc' }
    ];

    const resultDiv = document.createElement('div');
    resultDiv.className = 'resultat'; // Add a common class for each result

    if (guessedCharacter.name === selectedCharacter.name) {
        resultDiv.classList.add('correct-guess'); // Ajoute la classe d'animation si le personnage est correct
    }

    const promises = fields.map((field, index) => {
        return new Promise((resolve) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'result-category';

            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = field.label;
            categoryDiv.appendChild(categoryTitle);

            const categoryHr = document.createElement('hr');
            categoryDiv.appendChild(categoryHr);

            const resultBar = document.createElement('div');
            resultBar.className = `result-bar ${field.type || ''}`;
            categoryDiv.appendChild(resultBar);

            resultDiv.appendChild(categoryDiv);

            setTimeout(() => {
                const itemDiv = document.createElement('div');
                itemDiv.className = `result-item ${field.type || ''} ${getResultClass(guessedCharacter, selectedCharacter, field)} flip`;

                let comparisonClass = '';

                if (field.key === 'name') {
                    // Afficher l'image du personnage à la place du texte
                    const img = document.createElement('img');
                    img.src = getImagePath(guessedCharacter[field.key]); // Fonction pour obtenir le chemin de l'image
                    img.alt = 'Character Image';
                    img.className = 'character-image'; // Classe CSS pour le hover
                    itemDiv.appendChild(img);

                    // Ajouter un élément pour afficher le nom sur hover
                    const nameLabel = document.createElement('span');
                    nameLabel.className = 'character-name-label';
                    nameLabel.textContent = guessedCharacter[field.key];
                    itemDiv.appendChild(nameLabel);
                } else if (field.key === 'devilFruit') {
                    itemDiv.textContent = categorizeDevilFruit(guessedCharacter[field.key]);
                } else if (field.key === 'haki') {
                    itemDiv.textContent = formatHaki(guessedCharacter[field.key]);
                    if (guessedCharacter[field.key].length === selectedCharacter[field.key].length) {
                        itemDiv.classList.add('correct');
                    } else if (guessedCharacter[field.key].length > 0) {
                        itemDiv.classList.add('partial');
                    } else {
                        itemDiv.classList.add('incorrect');
                    }
                } else if (field.key === 'height' || field.key === 'bounty') {
                    comparisonClass = compareValues(selectedCharacter[field.key], guessedCharacter[field.key]);
                    itemDiv.innerHTML = field.key === 'bounty' ?
                        `<img src="/img/argent.png" alt="Bounty Icon" style="width: 15px; height: 20px; margin-right: 5px; border: 0px;">${formatBounty(guessedCharacter[field.key]) || 'Aucun'}` :
                        `${guessedCharacter[field.key] || 'Aucun'}`;
                } else if (field.key === 'firstArc') {
                    comparisonClass = compareArcs(selectedCharacter[field.key], guessedCharacter[field.key]);
                    itemDiv.textContent = guessedCharacter[field.key] || 'Aucun';
                } else {
                    itemDiv.textContent = guessedCharacter[field.key] || 'Aucun';
                }

                if (comparisonClass) {
                    itemDiv.classList.add(comparisonClass); // Ajouter la classe de comparaison seulement si elle n'est pas vide
                }

                resultBar.appendChild(itemDiv);

                setTimeout(() => {
                    itemDiv.classList.add('flip-in');
                    resolve(); // Resolve the promise when the animation is done
                }, 100);
            }, index * 300);
        });
    });

    resultContainer.appendChild(resultDiv);

    if (guessedCharacter.name === selectedCharacter.name) {
        await Promise.all(promises); // Wait for all animations to complete
        displaySuccessCard(selectedCharacter.name, history.length);
        document.getElementById('restartGameButton').style.display = 'block';
        document.querySelector('.success-card').scrollIntoView({ behavior: 'smooth' });
    }
}



// Fonction pour obtenir le chemin de l'image en fonction du nom
function getImagePath(characterName) {
    // Assurez-vous que le chemin correspond à vos fichiers d'image
    const imagePath = `img/${characterName.toLowerCase()}.png`;
    return imagePath;
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


    // A voir si il faut le mettre : 

    // const changeGame = document.createElement('button');
    // changeGame.textContent = 'Jouer au fruit du démon';
    // successCard.appendChild(changeGame);

    document.body.appendChild(successCard);

    // Défilement vers la carte de succès
    successCard.scrollIntoView({ behavior: 'smooth' });
}



document.getElementById('restartGameButton').addEventListener('click', () => {
    document.getElementById('characterInput').value = ''; // Effacer le texte du champ de saisie
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = ''; // Effacer les suggestions affichées
    suggestionsDiv.style.display = 'none'; // Masquer la barre de suggestion
    selectedCharacters = []; // Réinitialiser la liste des personnages sélectionnés
    currentSuggestions = []; // Réinitialiser les suggestions actuelles
});


function getResultClass(guessedCharacter, selectedCharacter, field) {
    if (field.key === 'devilFruit') {
        const guessedType = categorizeDevilFruit(guessedCharacter[field.key]);
        const selectedType = categorizeDevilFruit(selectedCharacter[field.key]);

        if (guessedType === selectedType) {
            return guessedCharacter[field.key] === selectedCharacter[field.key] ? 'correct' : 'correct-type';
        } else {
            return 'incorrect-type';
        }
    } else if (field.key === 'haki') {
        const guessedHaki = guessedCharacter[field.key].split(',').map(type => type.trim());
        const selectedHaki = selectedCharacter[field.key].split(',').map(type => type.trim());
        return guessedHaki.some(haki => selectedHaki.includes(haki)) ? 'correct' : 'incorrect';
    } else if (field.key === 'height' || field.key === 'bounty') {
        return guessedCharacter[field.key] === selectedCharacter[field.key] ? 'correct' : 'incorrect';
    } else {
        return guessedCharacter[field.key] === selectedCharacter[field.key] ? 'correct' : 'incorrect';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchDevilFruits();
    await startNewGame();
});


async function fetchDevilFruit() {
    try {
        const response = await fetch('/api/random-devil-fruit');
        const data = await response.json();
        document.getElementById('devil-fruit').innerText = `Fruit du démon: ${data.fruit}`;
        characterName = data.character;
    } catch (error) {
        console.error('Erreur:', error);
    }
}

function checkGuess(event) {
    event.preventDefault();
    const guess = document.getElementById('characterInput').value.trim();
    const resultElement = document.getElementById('result');
    if (guess.toLowerCase() === characterName.toLowerCase()) {
        resultElement.innerText = 'Correct !';
        resultElement.style.color = 'green';
    } else {
        resultElement.innerText = `Incorrect. Le bon personnage était: ${characterName}`;
        resultElement.style.color = 'red';
    }
}

function restartGame() {
    document.getElementById('characterInput').value = '';
    document.getElementById('result').innerText = '';
    fetchDevilFruit();
}

// Fetch a random devil fruit when the page loads
window.onload = fetchDevilFruit;