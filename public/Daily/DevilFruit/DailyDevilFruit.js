// Daily/DevilFruit/DailyDevilFruit.js

function getImagePath(characterName) {
    return `/img/${characterName}.png`;
}

// ✅ Fonction pour récupérer le fruit du démon du jour
async function fetchDailyDevilFruit() {
    try {
        console.log("📡 Envoi de la requête à /api/daily-devil-fruit...");
        const response = await fetch("/api/daily-devil-fruit");

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log("📨 Réponse reçue :", data);

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

        checkIfAlreadyPlayed();
    } catch (error) {
        console.error("❌ Erreur lors de la récupération du fruit du démon :", error);
    }
}

// ✅ Vérifier si l'utilisateur a déjà joué aujourd'hui
function checkIfAlreadyPlayed() {
    const lastPlayedDate = localStorage.getItem("lastPlayedDate");
    const today = new Date().toISOString().split("T")[0];

    if (lastPlayedDate === today) {
        const guessForm = document.getElementById("guessFruitForm");
        const resultContainer = document.getElementById("DailyresultFruitContainer");

        if (guessForm) guessForm.style.display = "none";
        if (resultContainer) {
            resultContainer.innerHTML = `<p>❌ Vous avez déjà joué aujourd'hui ! Revenez demain.</p>`;
        }
    }
}

// ✅ Soumettre une réponse
document.addEventListener("DOMContentLoaded", () => {
    const guessForm = document.getElementById("guessFruitForm");

    if (guessForm) {
        guessForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const guessInput = document.getElementById("characterInput");
            const resultContainer = document.getElementById("DailyresultFruitContainer");

            if (!guessInput || !resultContainer) {
                console.error("❌ Un élément nécessaire est introuvable !");
                return;
            }

            const guess = guessInput.value.trim();
            console.log("📩 Envoi de la réponse au serveur :", guess);

            if (!guess) {
                alert("Veuillez entrer un nom !");
                return;
            }

            try {
                const response = await fetch("/api/submit-daily-guess", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "last-played-date": localStorage.getItem("lastPlayedDate") || ""
                    },
                    body: JSON.stringify({ guess })
                });

                const data = await response.json();
                console.log("📨 Réponse du serveur :", data);

                // ✅ Vérification de l'existence du container avant modification
                if (!resultContainer) {
                    console.error("❌ L'élément #DailyresultFruitContainer est introuvable !");
                    return;
                }

                // ✅ Affichage du message reçu
                const messageElement = document.createElement("p");
                messageElement.textContent = data.message;
                resultContainer.appendChild(messageElement);

                if (response.ok) {
                    // ✅ Bonne réponse : empêcher de jouer à nouveau
                    guessInput.disabled = true;
                    document.getElementById("button").disabled = true;
                    resultContainer.style.color = "green";
                } else {
                    // ❌ Mauvaise réponse : ajout à l'historique et possibilité de rejouer
                    addIncorrectGuess(guess);
                    resultContainer.style.color = "red";
                }
            } catch (error) {
                console.error("❌ Erreur lors de la soumission :", error);
            }
        });
    }
});

// ✅ Ajouter une mauvaise réponse dans l'historique
function addIncorrectGuess(guess) {
    const container = document.getElementById("DailyresultFruitContainer");

    if (!container) {
        console.error("❌ L'élément #DailyresultFruitContainer est introuvable !");
        return;
    }

    // ✅ Création d'un élément pour afficher la mauvaise réponse
    const guessElement = document.createElement("div");
    guessElement.classList.add("incorrect-guess");
    guessElement.style.color = "red";

    const nameSpan = document.createElement("span");
    nameSpan.innerText = `❌ ${guess}`;

    guessElement.appendChild(nameSpan);
    container.appendChild(guessElement);
}

// ✅ Charger le fruit du jour au démarrage
document.addEventListener("DOMContentLoaded", fetchDailyDevilFruit);

// ✅ Bouton de réinitialisation du fruit du jour
document.addEventListener("DOMContentLoaded", () => {
    const resetButton = document.getElementById("resetDailyFruitButton");

    if (resetButton) {
        resetButton.addEventListener("click", async () => {
            try {
                console.log("🔄 Réinitialisation du fruit du jour en cours...");

                const response = await fetch("/api/reset-daily-devil-fruit", {
                    method: "POST"
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();
                console.log("✅ Nouveau fruit après réinitialisation :", data);

                // ✅ Mise à jour du fruit et du personnage SANS recharger la page
                const fruitElement = document.getElementById("Dailydevil-fruit");
                if (fruitElement) {
                    fruitElement.textContent = `❝ ${data.fruit} ❞`;
                }

                window.dailyCharacter = data.character || "Personnage inconnu";
                window.dailyFruit = data.fruit;

            } catch (error) {
                console.error("❌ Erreur lors de la réinitialisation :", error);
            }
        });
    }
});

