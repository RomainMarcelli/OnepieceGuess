// Daily/daily_mode.js 

function getImagePath(characterName) {
    return `/img/${characterName}.png`;
}

document.addEventListener("DOMContentLoaded", async () => {
    await fetchDailyCharacter();
    checkIfAlreadyPlayed();
});

async function fetchDailyCharacter() {
    try {
        const response = await fetch("/api/daily-character");
        const data = await response.json();

        if (!data.character || !data.character.name) {
            console.error("❌ Aucun personnage du jour trouvé !");
            return;
        }

        const characterElement = document.getElementById("dailyCharacter");
        if (characterElement) {
            characterElement.textContent = "Personnage du jour chargé. Bonne chance !";
        }

        window.dailyCharacter = data.character;
    } catch (error) {
        console.error("Erreur lors du chargement du personnage du jour", error);
    }
}

function checkIfAlreadyPlayed() {
    const lastPlayedDate = localStorage.getItem("lastPlayedDate");
    const today = new Date().toISOString().split('T')[0];
    
    if (lastPlayedDate === today) {
        document.getElementById("guessForm").style.display = "none";
        document.getElementById("resultContainer").innerHTML = `<p>❌ Vous avez déjà joué aujourd'hui ! Revenez demain.</p>`;
    }
}

document.getElementById("guessForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const guess = document.getElementById("characterInput").value.trim();

    if (!guess) {
        alert("Veuillez entrer un nom !");
        return;
    }

    const guessedCharacter = await fetchCharacterByName(guess);
    if (!guessedCharacter) {
        document.getElementById("resultContainer").insertAdjacentHTML(
            'beforeend',
            `<p>❌ Mauvaise réponse ! Essayez encore.</p>`
        );
        document.getElementById("characterInput").value = ""; // Efface l'input pour une nouvelle tentative
        return;
    }

    displayDailyResult(guessedCharacter, window.dailyCharacter);

    // ✅ Si la réponse est correcte, empêcher de rejouer
    if (guessedCharacter.name === window.dailyCharacter.name) {
        document.getElementById("guessForm").style.display = "none"; // Cache l'input uniquement si c'est correct
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem("lastPlayedDate", today);
    } else {
        document.getElementById("characterInput").value = ""; // Efface seulement l'input pour une nouvelle tentative
    }
});



async function fetchCharacterByName(name) {
    try {
        const response = await fetch("/api/characters");
        const characters = await response.json();
        return characters.find(char => char.name.toLowerCase() === name.toLowerCase());
    } catch (error) {
        console.error("Erreur lors de la récupération des personnages", error);
        return null;
    }
}

document.getElementById("resetDailyButton").addEventListener("click", async () => {
    try {
        const response = await fetch("/api/reset-daily", { method: "POST" });

        if (response.ok) {
            const data = await response.json();
            alert(`Le mode quotidien a été réinitialisé ! Nouveau personnage : ${data.character.name}`);

            localStorage.clear();
            document.cookie = "dailyPlayed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            
            setTimeout(() => {
                location.reload();
            }, 500);
        }
    } catch (error) {
        console.error("❌ Erreur réseau :", error);
        alert("⚠️ Impossible de contacter le serveur.");
    }
});

async function displayDailyResult(guessedCharacter, selectedCharacter) {
    const hakiImages = await fetchHakiImages();

    const dailyResultContainer = document.getElementById('dailyResultContainer'); // ✅ Nouvelle div pour les résultats Daily Mode

    // ✅ Vérifie si ce personnage a déjà été inscrit dans le Daily Mode pour éviter les doublons
    const existingResult = dailyResultContainer.querySelector(`.resultat[data-character="${guessedCharacter.name}"]`);
    if (existingResult) {
        return; // 🔄 Empêche d'afficher un doublon
    }

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
    resultDiv.className = 'resultat'; 
    resultDiv.dataset.character = guessedCharacter.name; // ✅ Ajoute un attribut pour éviter les doublons

    if (guessedCharacter.name === selectedCharacter.name) {
        resultDiv.classList.add('correct-guess'); // ✅ Ajoute une classe d'animation si le personnage est correct
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
                    // ✅ Afficher l'image du personnage à la place du texte
                    const img = document.createElement('img');
                    img.src = getImagePath(guessedCharacter[field.key]); 
                    img.alt = 'Character Image';
                    img.className = 'character-image';
                    itemDiv.appendChild(img);

                    // ✅ Ajouter un élément pour afficher le nom sur hover
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
                    itemDiv.classList.add(comparisonClass);
                }

                resultBar.appendChild(itemDiv);

                setTimeout(() => {
                    itemDiv.classList.add('flip-in');
                    resolve();
                }, 100);
            }, index * 300);
        });
    });

    dailyResultContainer.appendChild(resultDiv);

    if (guessedCharacter.name === selectedCharacter.name) {
        await Promise.all(promises);
        displaySuccessCard(selectedCharacter.name, history.length);
        document.getElementById('restartGameButton').style.display = 'block';
        document.querySelector('.success-card').scrollIntoView({ behavior: 'smooth' });
    }
}


function startCountdown() {
    setTimeout(() => {
        const countdownElement = document.getElementById("countdownTimer");

        if (!countdownElement) return;

        const now = new Date();
        const nextReset = new Date();
        nextReset.setHours(24, 0, 0, 0); // Minuit UTC+2

        const updateTimer = () => {
            const currentTime = new Date();
            const timeLeft = nextReset - currentTime;

            if (timeLeft <= 0) {
                countdownElement.textContent = "00:00:00";
                return;
            }

            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    }, 200);
}

// ✅ Lance le compte à rebours au chargement
document.addEventListener("DOMContentLoaded", startCountdown);
