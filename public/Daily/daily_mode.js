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
        document.getElementById("resultContainer").innerHTML = `<p>❌ Mauvaise réponse ! Le personnage était ${window.dailyCharacter.name}.</p>`;
        return;
    }

    displayComparisonResult(guessedCharacter, window.dailyCharacter);
    
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem("lastPlayedDate", today);
    document.getElementById("guessForm").style.display = "none";
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

function displayComparisonResult(guessedCharacter, correctCharacter) {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = "";

    const fields = [
        { key: "name", label: "Nom" },
        { key: "gender", label: "Genre" },
        { key: "affiliation", label: "Affiliation" },
        { key: "devilFruit", label: "Fruit du Démon" },
        { key: "haki", label: "Haki" },
        { key: "bounty", label: "Prime" },
        { key: "height", label: "Taille" },
        { key: "firstArc", label: "Premier Arc" }
    ];

    const resultDiv = document.createElement("div");
    resultDiv.className = "resultat";

    fields.forEach(field => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "result-item";
        
        const guessedValue = guessedCharacter[field.key] || "Aucun";
        const correctValue = correctCharacter[field.key] || "Aucun";
        
        const isMatch = guessedValue === correctValue;
        itemDiv.classList.add(isMatch ? "correct" : "incorrect");
        
        if (field.key === "name") {
            const img = document.createElement("img");
            img.src = getImagePath(correctCharacter[field.key]);
            img.alt = "Character Image";
            img.className = "character-image";
            itemDiv.appendChild(img);
        } else {
            itemDiv.textContent = `${field.label}: ${correctValue}`;
        }

        resultDiv.appendChild(itemDiv);
    });

    resultContainer.appendChild(resultDiv);
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
