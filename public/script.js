let selectedCharacter = null;
const history = []; // Array to keep track of character choices
let devilFruits = []; // Array to store devil fruits

const arcsChronologiques = [
    "Romance Dawn",
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
    "Wano"
];

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

function displaySuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.textContent = suggestion.name;
        div.className = 'suggestion';
        div.addEventListener('click', () => {
            document.getElementById('characterInput').value = suggestion.name;
            suggestionsDiv.innerHTML = '';
        });
        suggestionsDiv.appendChild(div);
    });
}

document.getElementById('guessForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const guessedCharacterName = document.getElementById('characterInput').value;
    try {
        const response = await fetch('/api/characters');
        if (response.ok) {
            const allCharacters = await response.json();
            const guessedCharacter = allCharacters.find(character => character.name === guessedCharacterName);

            if (guessedCharacter) {
                guessedCharacter.correct = guessedCharacter.name === selectedCharacter.name; // Add correct property
                history.push(guessedCharacter); // Add the guessed character to history
                displayResult(guessedCharacter, selectedCharacter);
                updateHistory(); // Update the history display
            } else {
                alert('Character not found!');
            }
        } else {
            console.error('Error fetching characters:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
});

async function startNewGame() {
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

// function getResultClass(guessedCharacter, selectedCharacter, field) {
//     if (field.key === 'devilFruit') {
//         const guessedType = categorizeDevilFruit(guessedCharacter[field.key]);
//         const selectedType = categorizeDevilFruit(selectedCharacter[field.key]);

//         if (guessedType === selectedType) {
//             // Type correct mais fruit incorrect
//             return guessedCharacter[field.key] === selectedCharacter[field.key] ? 'correct' : 'correct-type';
//         } else {
//             // Type incorrect
//             return 'incorrect-type';
//         }
//     } else if (field.key === 'haki') {
//         const guessedHaki = guessedCharacter[field.key].split(',').map(type => type.trim());
//         const selectedHaki = selectedCharacter[field.key].split(',').map(type => type.trim());
//         return guessedHaki.some(haki => selectedHaki.includes(haki)) ? 'correct' : 'incorrect';
//     } else if (field.key === 'height' || field.key === 'bounty') {
//         return guessedCharacter[field.key] === selectedCharacter[field.key] ? 'correct' : 'incorrect';
//     } else {
//         return guessedCharacter[field.key] === selectedCharacter[field.key] ? 'correct' : 'incorrect';
//     }
// }


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

    fields.forEach((field, index) => {
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

            if (field.key === 'devilFruit') {
                itemDiv.textContent = categorizeDevilFruit(guessedCharacter[field.key]);
            } else if (field.key === 'haki') {
                itemDiv.textContent = formatHaki(guessedCharacter[field.key]);
            } else if (field.key === 'height' || field.key === 'bounty') {
                comparisonClass = compareValues(selectedCharacter[field.key], guessedCharacter[field.key]);
                itemDiv.innerHTML = field.key === 'bounty' ?
                    `<img src="/img/argent.png" alt="Bounty Icon" style="width: 15px; height: 20px; margin-right: 5px;">${formatBounty(guessedCharacter[field.key]) || 'Aucun'}` :
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
            }, 100);
        }, index * 300);
    });

    resultContainer.appendChild(resultDiv);

    if (guessedCharacter.name === selectedCharacter.name) {
        document.getElementById('restartGameButton').style.display = 'block';
    }
}

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


