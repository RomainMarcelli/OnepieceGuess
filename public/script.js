let selectedCharacter = null;
const history = []; // Array to keep track of character choices
let devilFruits = []; // Array to store devil fruits

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

function displayResult(guessedCharacter, selectedCharacter) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // Clear previous results

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

    fields.forEach(field => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'result-category';

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = field.label;
        categoryDiv.appendChild(categoryTitle);

        const categoryHr = document.createElement('hr');
        categoryDiv.appendChild(categoryHr);

        const resultBar = document.createElement('div');
        resultBar.className = `result-bar ${field.type || ''}`;

        const itemDiv = document.createElement('div');
        itemDiv.className = `result-item ${field.type || ''} ${getResultClass(guessedCharacter, selectedCharacter, field)}`;
        
        if (field.key === 'haki') {
            itemDiv.textContent = formatHaki(guessedCharacter[field.key]);
        } else if (field.key === 'height' || field.key === 'bounty') {
            const comparison = compareValues(selectedCharacter[field.key], guessedCharacter[field.key]);
            itemDiv.innerHTML = `${guessedCharacter[field.key] || 'Aucun'} ${comparison}`;
        } else if (field.key === 'name' && guessedCharacter.name === 'Luffy') {
            const img = document.createElement('img');
            img.src = './img/luffy.png';
            img.alt = 'Luffy';
            img.className = 'character-image';
            itemDiv.appendChild(img);
        } else {
            itemDiv.textContent = guessedCharacter[field.key] || 'Aucun';
        }

        resultBar.appendChild(itemDiv);
        categoryDiv.appendChild(resultBar);
        resultContainer.appendChild(categoryDiv);
    });

    // Show the restart button if the game is finished
    if (guessedCharacter.name === selectedCharacter.name) {
        document.getElementById('restartGameButton').style.display = 'block';
    }
}

function formatHaki(haki) {
    if (!haki) return 'Aucun';
    const hakiTypes = haki.split(',').map(type => type.trim());
    return hakiTypes.length > 0 ? hakiTypes.join(', ') : 'Aucun';
}

function getResultClass(guessedCharacter, selectedCharacter, field) {
    if (field.key === 'haki') {
        const guessedHaki = guessedCharacter[field.key].split(',').map(type => type.trim());
        const selectedHaki = selectedCharacter[field.key].split(',').map(type => type.trim());
        return guessedHaki.some(haki => selectedHaki.includes(haki)) ? 'correct' : 'incorrect';
    } else if (field.key === 'height' || field.key === 'bounty') {
        return guessedCharacter[field.key] === selectedCharacter[field.key] ? 'correct' : 'incorrect';
    } else {
        return guessedCharacter[field.key] === selectedCharacter[field.key] ? 'correct' : 'incorrect';
    }
}

function categorizeDevilFruit(devilFruit) {
    const fruit = devilFruits.find(f => f.name === devilFruit);
    return fruit ? fruit.type : 'Aucun';
}

function compareValues(correctValue, guessedValue) {
    if (!correctValue || !guessedValue) return '';
    const correctNumber = parseFloat(correctValue.replace(/[^0-9.]/g, ''));
    const guessedNumber = parseFloat(guessedValue.replace(/[^0-9.]/g, ''));
    
    // Clear previous arrow styles
    const resultBar = document.createElement('div');
    
    if (guessedNumber < correctNumber) {
        resultBar.className = 'arrow-down'; // Apply arrow-down class
    } else if (guessedNumber > correctNumber) {
        resultBar.className = 'arrow-up'; // Apply arrow-up class
    } else {
        resultBar.className = ''; // No arrow if equal
    }
    
    return resultBar.className;
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

// Fetch the devil fruits on page load and start a new game
document.addEventListener('DOMContentLoaded', async () => {
    await fetchDevilFruits();
    await startNewGame();
});
