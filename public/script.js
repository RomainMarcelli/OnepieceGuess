let selectedCharacter = null;
const history = []; // Array to keep track of character choices

document.getElementById('startGameButton').addEventListener('click', async () => {
    await startNewGame();
    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('startGameButton').style.display = 'none';
    document.getElementById('restartGameButton').style.display = 'none';
});

document.getElementById('restartGameButton').addEventListener('click', async () => {
    await startNewGame();
    resetGame();
});

document.getElementById('characterInput').addEventListener('input', async (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        const response = await fetch(`/api/search?q=${query}`);
        const suggestions = await response.json();
        displaySuggestions(suggestions);
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
    const response = await fetch('/api/characters');
    const allCharacters = await response.json();
    const guessedCharacter = allCharacters.find(character => character.name === guessedCharacterName);
    
    if (guessedCharacter) {
        history.push(guessedCharacter); // Add the guessed character to history
        displayResult(guessedCharacter, selectedCharacter);
        updateHistory(); // Update the history display
    } else {
        alert('Character not found!');
    }
});

async function startNewGame() {
    const response = await fetch('/api/start-game');
    selectedCharacter = await response.json();
    document.getElementById('restartGameButton').style.display = 'block';
    history.length = 0; // Clear history for a new game
    updateHistory(); // Clear history display
}

function resetGame() {
    document.getElementById('result').innerHTML = '';
    document.getElementById('characterInput').value = '';
    document.getElementById('suggestions').innerHTML = '';
}

function displayResult(guessedCharacter, selectedCharacter) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const fields = [
        { key: 'name', label: 'Nom' },
        { key: 'devilFruit', label: 'Fruit du Démon', categorize: true },
        { key: 'affiliation', label: 'Affiliation' },
        { key: 'height', label: 'Taille' },
        { key: 'gender', label: 'Genre' },
        { key: 'bounty', label: 'Prime' }
    ];

    fields.forEach(field => {
        const div = document.createElement('div');
        div.className = `result-item ${getResultClass(guessedCharacter, selectedCharacter, field)}`;

        if (field.key === 'devilFruit') {
            const guessedType = categorizeDevilFruit(guessedCharacter[field.key]);
            const selectedType = categorizeDevilFruit(selectedCharacter[field.key]);
            
            if (guessedCharacter[field.key] === 'Aucun') {
                div.textContent = `${field.label}: Aucun`;
            } else {
                div.textContent = `${field.label}: ${guessedType}`;
            }
        } else if (field.key === 'height' || field.key === 'bounty') {
            const correctValue = selectedCharacter[field.key];
            const guessedValue = guessedCharacter[field.key];
            const comparison = compareValues(correctValue, guessedValue);
            div.innerHTML = `${field.label}: ${guessedValue || 'Aucun'} ${comparison}`;
        } else {
            div.textContent = `${field.label}: ${guessedCharacter[field.key] || 'Aucun'}`;
        }
        
        resultDiv.appendChild(div);
    });

    // Show the restart button if the game is finished
    if (guessedCharacter.name === selectedCharacter.name) {
        document.getElementById('restartGameButton').style.display = 'block';
    }
}

function getResultClass(guessedCharacter, selectedCharacter, field) {
    if (field.key === 'devilFruit') {
        const guessedType = categorizeDevilFruit(guessedCharacter[field.key]);
        const selectedType = categorizeDevilFruit(selectedCharacter[field.key]);
        return guessedType === selectedType ? 'correct' : 'incorrect';
    } else if (field.key === 'height' || field.key === 'bounty') {
        return guessedCharacter[field.key] === selectedCharacter[field.key] ? 'correct' : 'incorrect';
    } else {
        return guessedCharacter[field.key] === selectedCharacter[field.key] ? 'correct' : 'incorrect';
    }
}

function categorizeDevilFruit(devilFruit) {
    const logia = ['Mera Mera no Mi', 'Pika Pika no Mi', 'Goro Goro no Mi']; // Add more Logia fruits
    const paramecia = ['Gomu Gomu no Mi', 'Bara Bara no Mi', 'Hana Hana no Mi']; // Add more Paramecia fruits
    const zoan = ['Ushi Ushi no Mi', 'Tori Tori no Mi', 'Inu Inu no Mi']; // Add more Zoan fruits
    
    if (logia.includes(devilFruit)) return 'Logia';
    if (paramecia.includes(devilFruit)) return 'Paramecia';
    if (zoan.includes(devilFruit)) return 'Zoan';
    return 'Aucun';
}

function compareValues(correctValue, guessedValue) {
    if (!correctValue || !guessedValue) return '';
    const correctNumber = parseFloat(correctValue.replace(/[^0-9.]/g, ''));
    const guessedNumber = parseFloat(guessedValue.replace(/[^0-9.]/g, ''));
    
    if (guessedNumber < correctNumber) return '🔼'; // Up arrow for smaller
    if (guessedNumber > correctNumber) return '🔽'; // Down arrow for larger
    return ''; // No arrow if equal
}

function updateHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = ''; // Clear previous history
    
    history.forEach(character => {
        const div = document.createElement('div');
        div.className = `history-item ${character.correct ? 'correct' : 'incorrect'}`;
        
        const fields = [
            { key: 'name', label: 'Nom' },
            { key: 'devilFruit', label: 'Fruit du Démon', categorize: true },
            { key: 'affiliation', label: 'Affiliation' },
            { key: 'height', label: 'Taille' },
            { key: 'gender', label: 'Genre' },
            { key: 'bounty', label: 'Prime' }
        ];

        fields.forEach(field => {
            const itemDiv = document.createElement('div');
            const value = field.key === 'devilFruit' ? categorizeDevilFruit(character[field.key]) : character[field.key];
            itemDiv.textContent = `${field.label}: ${value || 'Aucun'}`;
            itemDiv.className = 'history-field';
            div.appendChild(itemDiv);
        });

        historyDiv.appendChild(div);
    });
}

