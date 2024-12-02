let characterName = '';
let incorrectGuesses = [];
// let attempts = 0;
let selectedFruit = [// ////////////////////////////
    ////////// Logia  /////////
    // ////////////////////////////
    { name: 'Moku Moku no Mi', type: 'Logia' },
    { name: 'Magu Magu no Mi', type: 'Logia' },
    { name: 'Hie Hie no Mi', type: 'Logia' },
    { name: 'Mera Mera no Mi', type: 'Logia' },
    { name: 'Pika Pika no Mi', type: 'Logia' },
    { name: 'Goro Goro no Mi', type: 'Logia' },
    { name: 'Yami Yami no Mi', type: 'Logia' },
    { name: 'Gasu Gasu no Mi', type: 'Logia' },
    { name: 'Yuki Yuki no Mi', type: 'Logia' },
    { name: 'Suna Suna no Mi', type: 'Logia' },
    { name: 'Numa Numa no Mi', type: 'Logia' },
    { name: 'Mori Mori no Mi', type: 'Logia' },
    // ////////////////////////////
    ////////// Paramecia  /////////
    // ////////////////////////////
    { name: 'Gomu Gomu no Mi', type: 'Paramecia' },
    { name: 'Bara Bara no Mi', type: 'Paramecia' },
    { name: 'Hana Hana no Mi', type: 'Paramecia' },
    { name: 'Yomi Yomi no Mi', type: 'Paramecia' },
    { name: 'Toshi Toshi no Mi', type: 'Paramecia' },
    { name: 'Gura Gura no Mi', type: 'Paramecia' },
    { name: 'Ope Ope no Mi', type: 'Paramecia' },
    { name: 'Jiki Jiki no Mi', type: 'Paramecia' },
    { name: 'String String Fruit', type: 'Paramecia' },
    { name: 'Soru Soru no Mi', type: 'Paramecia' },
    { name: 'Supa Supa no Mi', type: 'Paramecia' },
    { name: 'Doru Doru no Mi', type: 'Paramecia' },
    { name: 'Mane Mane no Mi', type: 'Paramecia' },
    { name: 'Riki Riki no Mi', type: 'Paramecia' },
    { name: 'Wara Wara no Mi', type: 'Paramecia' },
    { name: 'Ishi Ishi no Mi', type: 'Paramecia' },
    { name: 'Sui Sui no Mi', type: 'Paramecia' },
    { name: 'Horo Horo no Mi', type: 'Paramecia' },
    { name: 'Mero Mero no Mi', type: 'Paramecia' },
    { name: 'Fruit Urouge', type: 'Paramecia' },
    { name: 'Zushi Zushi no Mi', type: 'Paramecia' },
    { name: 'Kage Kage no Mi', type: 'Paramecia' },
    { name: 'Maki Maki no Mi', type: 'Paramecia' },
    { name: 'Nagi Nagi no Mi', type: 'Paramecia' },
    { name: 'Bari Bari no Mi', type: 'Paramecia' },
    { name: 'Nikyu Nikyu no Mi', type: 'Paramecia' },
    { name: 'Horu Horu no Mi', type: 'Paramecia' },
    { name: 'Noro Noro no Mi', type: 'Paramecia' },
    { name: 'Bane Bane no Mi', type: 'Paramecia' },
    { name: 'Doku Doku no Mi', type: 'Paramecia' },
    { name: 'Awa Awa no Mi', type: 'Paramecia' },
    { name: 'Doa Doa no Mi', type: 'Paramecia' },
    { name: 'Fuku Fuku no Mi', type: 'Paramecia' },
    { name: 'Mochi Mochi no Mi', type: 'Paramecia' },
    { name: 'Memo Memo no Mi', type: 'Paramecia' },
    { name: 'Mira Mira no Mi', type: 'Paramecia' },
    { name: 'Buku Buku no Mi', type: 'Paramecia' },
    { name: 'Pero Pero no Mi', type: 'Paramecia' },
    { name: 'Bisu Bisu no Mi', type: 'Paramecia' },
    { name: 'Kibi Kibi no Mi', type: 'Paramecia' },
    { name: 'Hira Hira no Mi', type: 'Paramecia' },
    { name: 'Giro Giro no Mi', type: 'Paramecia' },
    { name: 'Netsu Netsu no Mi', type: 'Paramecia' },
    { name: 'Shibo Shibo no Mi', type: 'Paramecia' },
    { name: 'Sube Sube no Mi', type: 'Paramecia' },
    { name: 'Nomi Nomi no Mi', type: 'Paramecia' },
    { name: 'Beta Beta no Mi', type: 'Paramecia' },
    { name: 'Pamu Pamu no Mi', type: 'Paramecia' },
    { name: 'Guru Guru no Mi', type: 'Paramecia' },
    { name: 'Buki Buki no Mi', type: 'Paramecia' },
    { name: 'Hobi Hobi no Mi', type: 'Paramecia' },
    { name: 'Nui Nui no Mi', type: 'Paramecia' },
    { name: 'Oto Oto no Mi', type: 'Paramecia' },
    { name: 'Kira Kira no Mi', type: 'Paramecia' },
    { name: 'Toki Toki no Mi', type: 'Paramecia' },
    { name: 'Uta Uta no Mi', type: 'Paramecia' },
    { name: 'Juku Juku no Mi', type: 'Paramecia' },
    { name: 'Choki Choki no Mi', type: 'Paramecia' },
    { name: 'au', type: 'Paramecia' },
    { name: 'au', type: 'Paramecia' },
    { name: 'au', type: 'Paramecia' },

    // ////////////////////////////
    // ZOAN
    // ////////////////////////////
    { name: 'Inu Inu no Mi', type: 'Zoan' },
    { name: 'Ryu Ryu no Mi', type: 'Zoan' },
    { name: 'Ushi Ushi no Mi', type: 'Zoan' },
    { name: 'Tori Tori no Mi', type: 'Zoan' },
    { name: 'Inu Inu no Mi', type: 'Zoan' },
    { name: 'Hito Hito no Mi', type: 'Zoan' },
    { name: 'Uo Uo no Mi', type: 'Zoan' },
    { name: 'Kame Kame no Mi', type: 'Zoan' },
    { name: 'Tori Tori no Mi', type: 'Zoan' },
    { name: 'Neko Neko no Mi', type: 'Zoan' },
    { name: 'Ushi Ushi no Mi', type: 'Zoan' },
    { name: 'Inu Inu no Mi', type: 'Zoan' },
    { name: 'Fruit de Kozuki Momonosuke (Fruit Artificiel)', type: 'Zoan' },
    { name: 'Ryu Ryu no Mi, Modèle: Pachycéphalosaure', type: 'Zoan' },
    { name: 'Neko Neko no Mi, Modèle: Tigre à dents de sabre', type: 'Zoan' },
    { name: 'Ryu Ryu no Mi, Modèle: Spinosaurus', type: 'Zoan' },
    { name: 'Ryu Ryu no Mi, Modèle: Ptéranodon', type: 'Zoan' },
    { name: 'Ryu Ryu no Mi, Modèle: Brachiosaure', type: 'Zoan' },
    { name: 'Zo Zo no Mi, Modèle: Mammouth', type: 'Zoan' },
    { name: 'Ryu Ryu no Mi, Modèle: Tricératops', type: 'Zoan' },
    { name: 'Kumo Kumo no Mi, Modèle: Rosamygale Grauvogeli', type: 'Zoan' },
    { name: 'Tama Tama no Mi', type: 'Zoan' },
    { name: 'Hebi Hebi no Mi, Modèle: Yamata no Orochi', type: 'Zoan' },
    // { name: 'Ato Ato no Mi', type: 'Zoan' },
    { name: 'Hito Hito no Mi, Modèle: Daibutsu', type: 'Zoan' },
    { name: 'au', type: 'Zoan' },
    { name: 'au', type: 'Zoan' },
    { name: 'Smile', type: 'Zoan' }]; 
let fruitType = ''; // Ajout pour stocker le type de fruit
let devilFruitsByType = {
    Logia: [
        'Moku Moku no Mi', 'Magu Magu no Mi', 'Hie Hie no Mi', 'Mera Mera no Mi',
        'Pika Pika no Mi', 'Goro Goro no Mi', 'Yami Yami no Mi', 'Gasu Gasu no Mi',
        'Yuki Yuki no Mi', 'Suna Suna no Mi', 'Numa Numa no Mi', 'Mori Mori no Mi'
    ],
    Paramecia: [
        'Gomu Gomu no Mi', 'Bara Bara no Mi', 'Hana Hana no Mi', 'Yomi Yomi no Mi',
        'Toshi Toshi no Mi', 'Gura Gura no Mi', 'Ope Ope no Mi', 'Jiki Jiki no Mi',
        'String String Fruit', 'Soru Soru no Mi', 'Supa Supa no Mi', 'Doru Doru no Mi',
        'Mane Mane no Mi', 'Riki Riki no Mi', 'Wara Wara no Mi', 'Ishi Ishi no Mi',
        'Sui Sui no Mi', 'Horo Horo no Mi', 'Mero Mero no Mi', 'Fruit Urouge',
        'Zushi Zushi no Mi', 'Kage Kage no Mi', 'Maki Maki no Mi', 'Nagi Nagi no Mi',
        'Bari Bari no Mi', 'Nikyu Nikyu no Mi', 'Horu Horu no Mi', 'Noro Noro no Mi',
        'Bane Bane no Mi', 'Doku Doku no Mi', 'Awa Awa no Mi', 'Doa Doa no Mi',
        'Fuku Fuku no Mi', 'Mochi Mochi no Mi', 'Memo Memo no Mi', 'Mira Mira no Mi',
        'Buku Buku no Mi', 'Pero Pero no Mi', 'Bisu Bisu no Mi', 'Kibi Kibi no Mi',
        'Hira Hira no Mi', 'Giro Giro no Mi', 'Netsu Netsu no Mi', 'Shibo Shibo no Mi',
        'Sube Sube no Mi', 'Nomi Nomi no Mi', 'Beta Beta no Mi', 'Pamu Pamu no Mi',
        'Guru Guru no Mi', 'Buki Buki no Mi', 'Hobi Hobi no Mi', 'Nui Nui no Mi',
        'Oto Oto no Mi', 'Kira Kira no Mi', 'Toki Toki no Mi', 'Uta Uta no Mi',
        'Juku Juku no Mi', 'Choki Choki no Mi'
    ],
    Zoan: [
        'Inu Inu no Mi', 'Ryu Ryu no Mi', 'Ushi Ushi no Mi', 'Tori Tori no Mi',
        'Hito Hito no Mi', 'Uo Uo no Mi', 'Kame Kame no Mi', 'Neko Neko no Mi',
        'Fruit de Kozuki Momonosuke (Fruit Artificiel)', 'Ryu Ryu no Mi, Modèle: Pachycéphalosaure',
        'Neko Neko no Mi, Modèle: Tigre à dents de sabre', 'Ryu Ryu no Mi, Modèle: Spinosaurus',
        'Ryu Ryu no Mi, Modèle: Ptéranodon', 'Ryu Ryu no Mi, Modèle: Brachiosaure',
        'Zo Zo no Mi, Modèle: Mammouth', 'Ryu Ryu no Mi, Modèle: Tricératops',
        'Kumo Kumo no Mi, Modèle: Rosamygale Grauvogeli', 'Tama Tama no Mi',
        'Hebi Hebi no Mi, Modèle: Yamata no Orochi', 'Hito Hito no Mi, Modèle: Daibutsu',
        'Smile'
    ]
};


function categorizeDevilFruit(devilFruit) {
    for (const [type, fruits] of Object.entries(devilFruitsByType)) {
        if (fruits.includes(devilFruit)) {
            return type;
        }
    }
    return 'Type inconnu';
}


async function fetchDevilFruit() {
    try {
        const response = await fetch('/api/random-devil-fruit');
        const data = await response.json();

        while (data.fruit === 'Aucun' || data.fruit === 'Smile') {
            const retryResponse = await fetch('/api/random-devil-fruit');
            const retryData = await retryResponse.json();
            if (retryData.fruit !== 'Aucun' && retryData.fruit !== 'Smile') {
                data.fruit = retryData.fruit;
                data.character = retryData.character;
                break;
            }
        }

        document.getElementById('devil-fruit').innerText = `❝ ${data.fruit} ❞`;
        characterName = data.character;

        fruitType = data.type || categorizeDevilFruit(data.fruit);
        selectedFruit = { name: data.fruit, type: fruitType }; // Mise à jour de selectedFruit

        attempts = 0;
        updateHintInfo();
    } catch (error) {
        console.error('Erreur:', error);
        alert("Une erreur est survenue lors de la récupération du fruit du démon. Veuillez réessayer.");
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

function getDevilFruitType(fruitName) {
    for (const type in devilFruitsByType) {
        if (devilFruitsByType[type].includes(fruitName)) {
            return type; // Retourne le type (Logia, Paramecia ou Zoan)
        }
    }
    return 'Type inconnu'; // Si le fruit n'est pas trouvé
}

function updateHintInfo() {
    const typeHintInfo = document.getElementById('typeHintInfo');
    // const traduitFruitHintInfo = document.getElementById('traduitFruitHintInfo');
    const typeHint = document.querySelector('#typeHint');
    // const traduitFruitHint = document.querySelector('#traduitFruitHint');
    const typeHintP = document.querySelector('#typeHint p');

    const attemptsFortypeHint = 1;

    const remainingAttemptsFortypeHint = Math.max(0, attemptsFortypeHint - attempts);

    if (remainingAttemptsFortypeHint > 0) {
        typeHintInfo.textContent = `Dans ${remainingAttemptsFortypeHint} Essais`;
        typeHintInfo.style.display = 'block';
        // Réinitialiser le filtre si les essais ne sont pas atteints
        typeHintImage.style.filter = '';
    } else {
        typeHintInfo.textContent = `Indice de type : ${selectedFruit.type}`;
        typeHintInfo.style.display = 'none';
        // Appliquer le filtre après avoir atteint le nombre d'essais
        typeHint.style.border = '2px solid #928157';
        typeHintP.style.color = '#928157'; 
        typeHintImage.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(60%) saturate(2369%) hue-rotate(353deg) brightness(100%) contrast(102%)';
    }
}


function toggleHint(id) {
    const typeHintDisplay = document.getElementById('typeHintDisplay');

    if (id === 'typeHintDisplay') {
        if (attempts < 1) {
            return;
        }

        if (typeHintDisplay.style.display === 'none' || typeHintDisplay.style.display === '') {
            traduitFruitHintDisplay.style.display = 'none';
            typeHintDisplay.innerHTML = `Indice de type : ${selectedFruit.type}`;
            typeHintDisplay.style.display = 'block';
        } else {
            typeHintDisplay.style.display = 'none';
        }
        console.log('Contenu de typeHintDisplay après 1 essai:', typeHintDisplay.innerHTML);
    }
}


// Fonction pour gérer les indices en fonction des essais
function updateHints() {
    // Met à jour les indices en fonction des essais
    updateHintInfo();
}

// Événements pour afficher ou cacher les indices
document.getElementById('typeHint').addEventListener('click', () => {
    toggleHint('typeHintDisplay');
});

document.getElementById('traduitFruitHint').addEventListener('click', () => {
    toggleHint('traduitFruitHintDisplay');
});


// Fetch a random devil fruit when the page loads
window.onload = fetchDevilFruit;

document.getElementById('guessFruitForm').addEventListener('submit', checkGuess);
