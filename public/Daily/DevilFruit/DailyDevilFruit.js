// Daily/DevilFriit/DailyDevilFruit.js 

function getImagePath(characterName) {
    return `/img/${characterName}.png`;
}

async function fetchDailyDevilFruit() {
    try {
        const response = await fetch("/api/daily-devil-fruit");
        const data = await response.json();

        document.getElementById("Dailydevil-fruit").textContent = `❝ ${data.fruit} ❞`;

        // ✅ Vérification pour éviter undefined
        window.dailyCharacter = data.character || "Personnage inconnu";
        window.dailyFruit = data.fruit; 

        checkIfAlreadyPlayed();
    } catch (error) {
        console.error("❌ Erreur lors du chargement du fruit du démon du jour", error);
    }
}

// ✅ Vérifier si l'utilisateur a déjà joué aujourd'hui
function checkIfAlreadyPlayed() {
    const lastPlayedDate = localStorage.getItem("lastPlayedDate");
    const today = new Date().toISOString().split("T")[0];

    if (lastPlayedDate === today) {
        document.getElementById("guessFruitForm").style.display = "none";
        document.getElementById("DailyresultFruitcontainer").innerHTML = `<p>❌ Vous avez déjà joué aujourd'hui ! Revenez demain.</p>`;
    }
}

// ✅ Soumettre une réponse
document.getElementById("guessFruitForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const guess = document.getElementById("characterInput").value.trim();

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
        document.getElementById("DailyresultFruitcontainer").innerHTML = `<p>${data.message}</p>`;

        if (response.ok) {
            // ✅ Enregistrer la date pour empêcher de rejouer
            const today = new Date().toISOString().split("T")[0];
            localStorage.setItem("lastPlayedDate", today);
            document.getElementById("guessFruitForm").style.display = "none";
        } else {
            // ✅ Ajouter la mauvaise réponse dans l'historique
            addIncorrectGuess(guess);
        }
    } catch (error) {
        console.error("❌ Erreur lors de la soumission", error);
    }
});

// ✅ Ajouter une mauvaise réponse dans l'historique
function addIncorrectGuess(guess) {
    const container = document.getElementById("DailyresultFruitcontainer");

    const guessElement = document.createElement("div");
    guessElement.classList.add("incorrect-guess");

    const nameSpan = document.createElement("span");
    nameSpan.innerText = guess;

    guessElement.appendChild(nameSpan);
    container.appendChild(guessElement);
}

// Charger le fruit du jour au démarrage
document.addEventListener("DOMContentLoaded", fetchDailyDevilFruit);
