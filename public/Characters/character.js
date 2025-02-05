let characters = []; // ✅ Déclaration globale
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("charactersContainer");
    const searchInput = document.getElementById("searchInput");

    // Récupérer la modale et ses éléments
    const modal = document.getElementById("characterModal");
    const closeModal = document.querySelector(".close");
    const modalImage = document.getElementById("modalCharacterImage");
    const modalName = document.getElementById("modalCharacterName");
    const modalAlias = document.getElementById("modalCharacterAlias");
    const modalDevilFruit = document.getElementById("modalCharacterDevilFruit");
    const modalHaki = document.getElementById("modalCharacterHaki");
    const modalAffiliation = document.getElementById("modalCharacterAffiliation");
    const modalHeight = document.getElementById("modalCharacterHeight");
    const modalGender = document.getElementById("modalCharacterGender");
    const modalBounty = document.getElementById("modalCharacterBounty");
    const modalFirstArc = document.getElementById("modalCharacterFirstArc");

    try {
        const response = await fetch("/api/characters"); // Récupération de l'API
        const characters = await response.json();

        // async function fetchCharacters() {
        //     try {
        //         const response = await fetch("/api/characters"); // Récupération de l'API
        //         characters = await response.json();
        //         displayCharacters(characters);
        //     } catch (error) {
        //         console.error("Erreur lors du chargement des personnages :", error);
        //     }
        // }


        function getImagePath(name) {
            return `/img/${name.toLowerCase()}.png`; // Assumes images are named as character names
        }

        function updateCharacterCount(count) {
            const totalCharactersElement = document.getElementById("totalCharacters");
            if (totalCharactersElement) {
                totalCharactersElement.textContent = `Nombre de personnages affichés : ${count}`;
            }
        }

        let devilFruitsByType = {};

        async function fetchDevilFruits() {
            try {
                const response = await fetch('/api/devilFruitsByType');
                const data = await response.json();

                if (!data.Zoan || !data.Paramecia || !data.Logia) {
                    console.error("❌ Structure des fruits du démon incorrecte :", data);
                    return;
                }

                // ✅ Stocker les fruits avec leurs clés correctes
                devilFruitsByType = {
                    zoan: data.Zoan,
                    paramecia: data.Paramecia,
                    logia: data.Logia
                };

                console.log("✅ Fruits du démon récupérés :", devilFruitsByType);
            } catch (error) {
                console.error("Erreur lors du chargement des fruits du démon :", error);
            }
        }

        function getDevilFruitType(fruitName) {
            if (!fruitName || fruitName.toLowerCase() === "aucun") {
                return "noFruit"; // ✅ Aucun fruit du démon
            }

            // 🔥 Assurer que `devilFruitsByType` est bien défini
            if (!devilFruitsByType ||
                !devilFruitsByType.zoan ||
                !devilFruitsByType.paramecia ||
                !devilFruitsByType.logia) {
                console.error("❌ Erreur : Structure des fruits du démon incorrecte au moment du filtrage", devilFruitsByType);
                return "unknown"; // ✅ Retourne "unknown" au lieu de planter
            }

            // ✅ Vérifie si le fruit appartient à un type
            if (devilFruitsByType.zoan.includes(fruitName)) {
                return "zoan";
            } else if (devilFruitsByType.paramecia.includes(fruitName)) {
                return "paramecia";
            } else if (devilFruitsByType.logia.includes(fruitName)) {
                return "logia";
            } else {
                return "unknown";
            }
        }

        function displayCharacters(filteredCharacters) {
            console.log("🎭 Affichage des personnages :", filteredCharacters);
            console.log("📢 Appel de displayCharacters() avec :", filteredCharacters);

            // 🔥 Assurer que le conteneur est bien sélectionné
            const container = document.getElementById("charactersContainer");
            if (!container) {
                console.error("❌ Erreur : Le conteneur des personnages (charactersContainer) est introuvable !");
                return;
            }

            container.innerHTML = ""; // 🔄 Réinitialisation

            if (filteredCharacters.length === 0) {
                console.warn("⚠️ Aucun personnage trouvé !");
                container.innerHTML = "<p>Aucun personnage ne correspond à votre recherche.</p>";
                return;
            }

            filteredCharacters.forEach((character) => {
                console.log("✅ Affichage de :", character.name);
                const characterCard = document.createElement("div");
                characterCard.classList.add("character-card");

                const imagePath = getImagePath(character.name);

                characterCard.innerHTML = `
                    <div class="character-image-container">
                        <img src="${imagePath}" alt="${character.name}" class="character-image" 
                             onerror="this.onerror=null; this.src='/img/default.png';">
                    </div>
                    <h2 class="character-name">${character.name}</h2>
                `;

                // Ajoute un événement pour afficher la modale
                characterCard.addEventListener("click", () => {
                    console.log("📌 Clic sur", character.name);
                    modalImage.src = imagePath;
                    modalName.textContent = character.name;
                    modalAlias.textContent = Array.isArray(character.aliases) ? character.aliases.join(", ") : "Aucun";
                    modalDevilFruit.textContent = character.devilFruit || "Aucun";
                    modalHaki.textContent = character.haki || "Aucun";
                    modalAffiliation.textContent = character.affiliation;
                    modalHeight.textContent = character.height;
                    modalGender.textContent = character.gender;
                    modalBounty.textContent = character.bounty;
                    modalFirstArc.textContent = character.firstArc;
                    modal.style.display = "flex";
                });

                container.appendChild(characterCard);
            });

            updateCharacterCount(filteredCharacters.length);
        }

        

        async function filterCharacters() {
            console.log("🔍 Filtrage en cours...");

            // Vérifie si les personnages sont bien chargés
            if (!characters || characters.length === 0) {
                console.error("⚠️ Aucun personnage chargé !");
                return;
            }
            console.log("📦 Personnages chargés :", characters);

            // Vérifie si les fruits du démon sont bien chargés
            if (!devilFruitsByType.zoan || !devilFruitsByType.paramecia || !devilFruitsByType.logia) {
                console.warn("⚠️ Fruits du démon non chargés, récupération en cours...");
                await fetchDevilFruits(); // Recharge les fruits du démon si nécessaire
            }

            // 🔎 Récupère les valeurs des filtres
            const searchTerm = searchInput.value.toLowerCase();
            const selectedGender = genderFilter.value;
            const selectedAffiliation = affiliationFilter.value;
            const selectedHaki = hakiFilter.value;
            const selectedArc = document.getElementById("arcFilter").value;
            const selectedDevilFruit = document.getElementById("devilFruitFilter").value;
            const selectedHeight = document.getElementById("heightFilter").value;
            const minBounty = parseInt(bountyMinSlider.value) || 0;
            const maxBounty = parseInt(bountyMaxSlider.value) || 5000000000;

            // Filtrage des personnages
            let filteredCharacters = characters.filter(character => {
                // 🔎 Recherche avancée (nom, alias, fruit du démon, haki, affiliation, prime, taille, arc)
                const matchesSearch = character.name.toLowerCase().includes(searchTerm) ||
                    (Array.isArray(character.aliases) && character.aliases.some(alias => alias.toLowerCase().includes(searchTerm))) ||
                    (character.devilFruit && character.devilFruit.toLowerCase().includes(searchTerm)) ||
                    (character.haki && character.haki.toLowerCase().includes(searchTerm)) ||
                    (character.affiliation && character.affiliation.toLowerCase().includes(searchTerm)) ||
                    (character.bounty && character.bounty.toLowerCase().includes(searchTerm)) ||
                    (character.height && character.height.toString().toLowerCase().includes(searchTerm)) ||
                    (character.firstArc && character.firstArc.toLowerCase().includes(searchTerm));


                // ✅ Vérifie les autres filtres (genre, affiliation, haki, arc, prime, taille, etc.)
                const matchesGender = selectedGender === "all" || character.gender === selectedGender;
                const matchesAffiliation = selectedAffiliation === "all" || (character.affiliation && character.affiliation === selectedAffiliation);

                // ✅ Vérifie le Haki
                const hakiArray = character.haki ? character.haki.split(', ') : [];
                const hakiCount = hakiArray.length;
                let matchesHaki = selectedHaki === "all" ||
                    (selectedHaki === "3" && hakiCount === 3) ||
                    (selectedHaki === "2" && hakiCount === 2) ||
                    (selectedHaki === "1" && hakiCount === 1 && (hakiArray.includes("Armement") || hakiArray.includes("Vision"))) ||
                    (selectedHaki === "0" && (!character.haki || character.haki.trim() === "" || character.haki.toLowerCase() === "aucun"));

                // ✅ Vérifie la Prime
                let matchesBounty = true;
                if (character.bounty) {
                    const bountyValue = parseInt(character.bounty.replace(/[^0-9]/g, ""), 10) || 0;
                    matchesBounty = bountyValue >= minBounty && bountyValue <= maxBounty;
                }

                // ✅ Vérifie l'Arc
                const matchesArc = selectedArc === "all" || character.firstArc === selectedArc;

                // ✅ Vérifie le Fruit du Démon
                let matchesDevilFruit = true;
                if (selectedDevilFruit !== "all") {
                    if (selectedDevilFruit === "noFruit") {
                        matchesDevilFruit = !character.devilFruit || character.devilFruit.toLowerCase() === "aucun";
                    } else if (selectedDevilFruit === "hasFruit") {
                        matchesDevilFruit = character.devilFruit && character.devilFruit.toLowerCase() !== "aucun";
                    } else {
                        const characterFruitType = getDevilFruitType(character.devilFruit);
                        matchesDevilFruit = characterFruitType === selectedDevilFruit;
                    }
                }

                // ✅ Vérifie la Taille
                function getCharacterHeight(heightStr) {
                    if (!heightStr) return 0;
                    const heightMatch = heightStr.match(/\d+/g);
                    return heightMatch ? parseInt(heightMatch[0], 10) / 100 : 0;
                }

                function matchesHeight(characterHeight, filter) {
                    const heightRanges = {
                        "0-1": [0, 1], "1-2": [1, 2], "2-3": [2, 3], "3-4": [3, 4],
                        "4-5": [4, 5], "5-6": [5, 6], "6-7": [6, 7], "7-8": [7, 8],
                        "8-9": [8, 9], "9-10": [9, 10], "10+": [10, Infinity]
                    };
                    return filter === "all" || (characterHeight >= heightRanges[filter][0] && characterHeight < heightRanges[filter][1]);
                }

                const characterHeight = getCharacterHeight(character.height);
                const matchesHeightFilter = matchesHeight(characterHeight, selectedHeight);

                return matchesSearch && matchesGender && matchesAffiliation && matchesHaki && matchesBounty && matchesArc && matchesDevilFruit && matchesHeightFilter;
            });

            if (filteredCharacters.length === 0) {
                console.warn("⚠️ Aucun personnage trouvé après filtrage !");
            }

            console.log("🔎 Terme de recherche :", searchTerm);
            console.log("👀 Personnages trouvés :", filteredCharacters);
            console.log("🛠️ Contenu de filteredCharacters avant affichage :", JSON.stringify(filteredCharacters, null, 2));

            setTimeout(() => {
                displayCharacters(filteredCharacters);
            }, 300);
            

            // ✅ Mise à jour des personnages affichés
            displayCharacters(filteredCharacters);
            updateCharacterCount(filteredCharacters.length);

            console.log("🔎 Terme de recherche :", searchTerm);
            console.log("👀 Personnages trouvés :", filteredCharacters);
        }


        // ✅ Vérifie que les filtres sont bien appliqués en temps réel
        searchInput.addEventListener("input", filterCharacters);
        genderFilter.addEventListener("change", filterCharacters);
        affiliationFilter.addEventListener("change", filterCharacters);
        hakiFilter.addEventListener("change", filterCharacters);
        document.getElementById("arcFilter").addEventListener("change", filterCharacters);
        document.getElementById("devilFruitFilter").addEventListener("change", filterCharacters);
        document.getElementById("heightFilter").addEventListener("change", filterCharacters);


        displayCharacters(characters); // Affichage initial

        // Fermer la modale quand on clique sur la croix
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Fermer la modale quand on clique en dehors
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });

        // 🎯 Recherche en temps réel
        searchInput.addEventListener("input", (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCharacters = characters.filter(character =>
                character.name.toLowerCase().includes(searchTerm) ||
                (Array.isArray(character.aliases) && character.aliases.some(alias => alias.toLowerCase().includes(searchTerm)))
            );
            displayCharacters(filteredCharacters);
        });

        const bountyMinSlider = document.getElementById("bountyMin");
        const bountyMaxSlider = document.getElementById("bountyMax");
        const bountyMinValue = document.getElementById("bountyMinValue");
        const bountyMaxValue = document.getElementById("bountyMaxValue");
        const rangeProgress = document.getElementById("rangeProgress"); // ✅ Barre dynamique

        // Fonction pour ajuster dynamiquement l'échelle des primes
        function adjustBountyStep(slider) {
            let value = parseInt(slider.value, 10);

            if (value < 1000000) {
                slider.step = 100000; // Petits pas avant 1M
            } else if (value < 100000000) {
                slider.step = 1000000; // Pas moyen entre 1M et 100M
            } else if (value < 1000000000) {
                slider.step = 10000000; // Pas grand entre 100M et 1B
            } else {
                slider.step = 100000000; // Pas très grand après 1B
            }
        }

        // ✅ Fonction pour mettre à jour la barre de progression
        function updateProgressBar() {
            const minVal = parseInt(bountyMinSlider.value, 10);
            const maxVal = parseInt(bountyMaxSlider.value, 10);
            const minRange = parseInt(bountyMinSlider.min, 10);
            const maxRange = parseInt(bountyMaxSlider.max, 10);

            const leftPercent = ((minVal - minRange) / (maxRange - minRange)) * 100;
            const rightPercent = ((maxVal - minRange) / (maxRange - minRange)) * 100;

            rangeProgress.style.left = leftPercent + "%";
            rangeProgress.style.width = (rightPercent - leftPercent) + "%";
        }

        // ✅ Met à jour les valeurs affichées et ajuste l'échelle
        function updateBountyValues() {
            adjustBountyStep(bountyMinSlider);
            adjustBountyStep(bountyMaxSlider);

            let minValue = parseInt(bountyMinSlider.value, 10);
            let maxValue = parseInt(bountyMaxSlider.value, 10);

            // Empêcher les curseurs de se croiser
            if (minValue > maxValue) {
                [minValue, maxValue] = [maxValue, minValue];
                bountyMinSlider.value = minValue;
                bountyMaxSlider.value = maxValue;
            }

            bountyMinValue.textContent = formatBounty(minValue);
            bountyMaxValue.textContent = formatBounty(maxValue);

            updateProgressBar(); // ✅ Met à jour la barre dynamique

            filterCharacters(); // Filtrer les personnages après changement
        }

        // Fonction pour afficher la prime en milliards / millions
        function formatBounty(value) {
            if (value >= 1000000000) {
                return (value / 1000000000).toFixed(2) + " B"; // Milliards
            } else if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + " M"; // Millions
            } else {
                return value.toLocaleString() + " Berries"; // Valeur normale
            }
        }

        // 🔹 Ajout des écouteurs d'événements
        bountyMinSlider.addEventListener("input", updateBountyValues);
        bountyMaxSlider.addEventListener("input", updateBountyValues);

        // ✅ Mise à jour initiale pour éviter un affichage incorrect au chargement
        updateBountyValues();

    } catch (error) {
        console.error("Erreur lors du chargement des personnages :", error);
        container.innerHTML = "<p>Impossible de charger les personnages.</p>";
    }
});