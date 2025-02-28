function getImagePath(characterName) {
    return `/img/${characterName}.png`;
}


// ✅ Fonction pour récupérer le fruit du démon du jour
async function fetchDailyDevilFruit() {
    document.getElementById("characterInput").disabled = false;
    try {
        const response = await fetch("/api/daily-devil-fruit");

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();

        // Vérifier que l'élément existe avant modification
        const fruitElement = document.getElementById("Dailydevil-fruit");
        if (!fruitElement) {
            console.error("❌ L'élément #Dailydevil-fruit est introuvable !");
            return;
        }

        // ✅ Affichage du fruit venant du fichier JSON
        fruitElement.textContent = `❝ ${data.fruit} ❞`;

        // ✅ Stockage des infos pour utilisation future
        window.dailyCharacter = data.character || "Personnage inconnu";
        window.dailyFruit = data.fruit;
        window.isDailyMode = true;  // Activer le mode daily

        checkIfAlreadyPlayed();
        updateHintInfo(); // ✅ Ajout de l'affichage des indices ici !
        
        console.log("🔍 Statut de l'input après chargement :", document.getElementById("characterInput").disabled);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération du fruit du démon :", error);
    }
}

// ✅ Vérifier si l'utilisateur a déjà joué aujourd'hui
function checkIfAlreadyPlayed() {
    const lastPlayedDate = localStorage.getItem("lastPlayedDate_dailyDevilFruit"); // Utilisation d'une clé spécifique
    const today = new Date().toISOString().split("T")[0];

    console.log("📌 Date stockée pour DailyDevilFruit :", lastPlayedDate);
    console.log("📆 Date d’aujourd’hui :", today);

    // ✅ S'assurer que l'input est bien activé au départ
    document.getElementById("characterInput").disabled = false;
    document.getElementById("guessFruitForm").style.display = "block";

    if (lastPlayedDate === today) {
        console.warn("🚫 Joueur déjà identifié pour DailyDevilFruit !");
        document.getElementById("guessFruitForm").style.display = "none";
        document.getElementById("DailyresultFruitContainer").innerHTML = `<p>❌ Vous avez déjà joué aujourd'hui ! Revenez demain.</p>`;
    } else {
        console.log("✅ Joueur autorisé à jouer sur DailyDevilFruit aujourd’hui !");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const guessForm = document.getElementById("guessFruitForm");

    if (guessForm) {
        guessForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const guessInput = document.getElementById("characterInput");
            const resultContainer = document.getElementById("DailyresultFruitContainer");

            if (!guessInput) {
                console.error("❌ L'élément #characterInput est introuvable !");
                return;
            }

            let guess = guessInput.value.trim();
            if (!guess && guessInput.dataset.actualName) {
                console.warn("⚠️ `value` est vide, récupération via `dataset.actualName`");
                guess = guessInput.dataset.actualName.trim();
            }

            if (!guess) {
                console.warn("❗ Le champ est vide !");
                alert("Veuillez entrer un nom !");
                return;
            }

            try {
                const response = await fetch("/api/submit-daily-guess", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "last-played-date": localStorage.getItem("lastPlayedDate_dailyDevilFruit") || ""
                    },
                    body: JSON.stringify({ guess })
                });

                const data = await response.json();

                if (!resultContainer) {
                    console.error("❌ L'élément #DailyresultFruitContainer est introuvable !");
                    return;
                }

                // 🔍 **Ajout des logs pour voir les valeurs comparées**
                console.log("🎯 Comparaison du guess :", guess, "vs", window.dailyCharacter);
                console.log("🧐 Type de guess :", typeof guess);
                console.log("🧐 Type de dailyCharacter :", typeof window.dailyCharacter);
                console.log("📝 dailyCharacter actuel :", window.dailyCharacter);

                // ✅ **Vérification si la réponse est correcte**
                if (guess.toLowerCase() === window.dailyCharacter.toLowerCase()) {
                    console.log("✅ Bonne réponse !");
                    
                    // ✅ **Stocker la date pour empêcher de rejouer aujourd'hui**
                    localStorage.setItem("lastPlayedDate_dailyDevilFruit", new Date().toISOString().split("T")[0]);
                    
                    displayDailySuccessCard(window.dailyCharacter); // ✅ Affichage de la carte de succès
                } else {
                    console.log("🚀 guess envoyé à `updateIncorrectGuesses()` :", guess);
                    updateIncorrectGuesses(guess); // Ajoute la mauvaise réponse à l'historique
                }

            } catch (error) {
                console.error("❌ Erreur lors de la soumission :", error);
            }

            setTimeout(() => {
            }, 500);
        });
    }
});

function displayCharacterDetails(name) {
    const container = document.getElementById('DailyresultFruitContainer');

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

// ✅ Afficher les mauvaises réponses
function updateIncorrectGuesses(guess) {
    const container = document.getElementById("DailyresultFruitContainer");

    console.log("📌 Fonction `updateIncorrectGuesses()` appelée pour le mode DAILY avec :", guess);

    if (!guess) {
        console.error("🚨 `guess` est vide ou indéfini !");
        return;
    }

    if (!window.isDailyMode) {
        console.warn("⏳ Ignoré : Ce n'est pas le mode DAILY.");
        return;
    }

    // ✅ Vérifier si l'input est activé après une mauvaise réponse
    document.getElementById("characterInput").disabled = false;

    // Vérifier si cette réponse a déjà été ajoutée
    const existingGuesses = Array.from(container.querySelectorAll('.incorrect-guess span')).map(el => el.textContent.trim());
    if (existingGuesses.includes(guess)) {
        console.warn("⚠️ La réponse existe déjà, on ne l'ajoute pas.");
        return;
    }

    incorrectGuesses.push(guess);

    const guessElement = document.createElement("div");
    guessElement.classList.add("incorrect-guess");

    const img = document.createElement("img");
    img.src = getImagePath(guess);
    img.alt = "Character Image";
    img.className = "suggestion-image";

    const nameSpan = document.createElement("span");
    nameSpan.innerText = `${guess}`;

    guessElement.appendChild(img);
    guessElement.appendChild(nameSpan);
    container.appendChild(guessElement);
}

// ✅ Charger le fruit du jour au démarrage
document.addEventListener("DOMContentLoaded", fetchDailyDevilFruit);

// ✅ Réinitialisation du fruit du jour
document.addEventListener("DOMContentLoaded", () => {
    const resetButton = document.getElementById("resetDailyFruitButton");

    if (resetButton) {
        resetButton.addEventListener("click", async () => {
            try {

                const response = await fetch("/api/reset-daily-devil-fruit", {
                    method: "POST"
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();

                const fruitElement = document.getElementById("Dailydevil-fruit");
                if (fruitElement) {
                    fruitElement.textContent = `❝ ${data.fruit} ❞`;
                }

                window.dailyCharacter = data.character || "Personnage inconnu";
                window.dailyFruit = data.fruit;
                incorrectGuesses = [];
                document.getElementById("DailyresultFruitContainer").innerHTML = "";

            } catch (error) {
                console.error("❌ Erreur lors de la réinitialisation :", error);
            }
        });
    }
});




function displayDailySuccessCard(characterName) {
    console.log("🎉 Affichage de la carte de succès pour :", characterName);

    // ✅ Réactiver l'input après succès
    document.getElementById("characterInput").disabled = false;
    document.getElementById("guessFruitForm").style.display = "block";

    // Vérifier si une carte de succès existe déjà et la supprimer
    const existingSuccessCard = document.querySelector(".success-card");
    if (existingSuccessCard) {
        existingSuccessCard.remove();
    }

    const successCard = document.createElement("div");
    successCard.className = "success-card";

    const successTitle = document.createElement('h2');
    successTitle.textContent = 'Bravo!';
    successCard.appendChild(successTitle);

    // Conteneur pour l’image et le nom du personnage
    const characterContainer = document.createElement("div");
    characterContainer.className = "character-container";

    // Image du personnage
    const characterImage = document.createElement("img");
    characterImage.src = getImagePath(characterName);
    characterImage.alt = "Character Image";
    characterImage.className = "character-image";

    // Nom du personnage
    const nameSpan = document.createElement("span");
    nameSpan.className = "character-name";
    nameSpan.textContent = characterName;

    // Ajout des éléments au conteneur
    characterContainer.appendChild(characterImage);
    characterContainer.appendChild(nameSpan);
    successCard.appendChild(characterContainer);

    // Message de confirmation
    const attemptsMessage = document.createElement('p');
    attemptsMessage.textContent = `Nombre d'essais réalisés : ${attempts}`;
    successCard.appendChild(attemptsMessage);

    // Désactiver le formulaire après une bonne réponse
    document.getElementById("guessFruitForm").style.display = "none";

    // Ajout de la carte dans le conteneur des résultats
    const resultContainer = document.getElementById("DailyresultFruitContainer");
    if (!resultContainer) {
        console.error("❌ Erreur : `DailyresultFruitContainer` est introuvable !");
        return;
    }
    document.body.appendChild(successCard);

    // Défilement automatique vers la carte de succès
    successCard.scrollIntoView({ behavior: "smooth" });
}
