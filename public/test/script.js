let characterName = '';
let devilFruitType = ''; // Stocke le type de fruit du démon
let attempts = 0;

async function fetchDevilFruit() {
    // Simule une requête pour obtenir un fruit du démon (remplacez par votre API)
    const devilFruits = [
        { fruit: 'Gomu Gomu no Mi', character: 'Luffy', type: 'Paramecia' },
        { fruit: 'Mera Mera no Mi', character: 'Ace', type: 'Logia' },
        { fruit: 'Hito Hito no Mi', character: 'Chopper', type: 'Zoan' }
    ];
    
    const randomFruit = devilFruits[Math.floor(Math.random() * devilFruits.length)];
    document.getElementById('devil-fruit').innerText = `🍇 ${randomFruit.fruit}`;
    characterName = randomFruit.character;
    devilFruitType = randomFruit.type;
    attempts = 0;
    updateHintInfo();
}

function checkGuess(event) {
    event.preventDefault();
    const inputElement = document.getElementById('characterInput');
    const guess = inputElement.value.trim();

    attempts++;

    if (guess.toLowerCase() === characterName.toLowerCase()) {
        alert("Félicitations ! Vous avez trouvé le personnage !");
        fetchDevilFruit();
    } else {
        document.getElementById('incorrectGuesses').innerText += ` ${guess}`;
    }

    inputElement.value = '';
    updateHintInfo();
}

function updateHintInfo() {
    const typeHintInfo = document.getElementById('typeHint');
    if (attempts >= 1) {
        typeHintInfo.innerText = `Indice Type : ${devilFruitType}`;
    }
}

document.getElementById('guessForm').addEventListener('submit', checkGuess);

// Initialiser le premier fruit
fetchDevilFruit();
