function getImagePath(characterName) {
    return `../img/${characterName}.png`;
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

    // ✅ Ajoute un nouvel élément sans supprimer les anciens
    displayResult(guessedCharacter, window.dailyCharacter);

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
