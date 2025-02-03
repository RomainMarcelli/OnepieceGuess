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

        function getImagePath(name) {
            return `/img/${name.toLowerCase()}.png`; // Assumes images are named as character names
        }

        function updateCharacterCount(count) {
            const totalCharactersElement = document.getElementById("totalCharacters");
            if (totalCharactersElement) {
                totalCharactersElement.textContent = `Nombre de personnages affichés : ${count}`;
            }
        }

        function displayCharacters(filteredCharacters) {
            container.innerHTML = ""; // Réinitialisation

            filteredCharacters.forEach((character) => {
                const characterCard = document.createElement("div");
                characterCard.classList.add("character-card");

                const imagePath = getImagePath(character.name);

                characterCard.innerHTML = `
                    <div class="character-image-container">
                        <img src="${imagePath}" alt="${character.name}" class="character-image" onerror="this.onerror=null; this.src='/img/default.png';">
                    </div>
                    <h2 class="character-name">${character.name}</h2>
                `;

                // Ajouter un événement au clic sur la carte du personnage
                characterCard.addEventListener("click", () => {
                    // Mettre à jour les informations de la modale
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

                    // Afficher la modale
                    modal.style.display = "flex";
                });

                container.appendChild(characterCard);
            });
            updateCharacterCount(filteredCharacters.length);
        }

        function filterCharacters() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedGender = genderFilter.value;
            const selectedAffiliation = affiliationFilter.value;
            const selectedHaki = hakiFilter.value;
            const selectedArc = document.getElementById("arcFilter").value;
        
            const minBounty = parseInt(bountyMinSlider.value) || 0;
            const maxBounty = parseInt(bountyMaxSlider.value) || 5000000000;
            
            const predefinedAffiliations = [
                "Straw Hat Pirates", "Marine", "Armée Révolutionnaire",
                "Équipage de Barbe Blanche", "Équipage des Pirates de Roger",
                "Équipe aux Cent Bêtes", "Équipage du Roux", "Équipage de Barbe Noire",
                "Guilde de la Croix", "Kid Pirates", "Équipage du Heart", "Équipage de Big Mom",
                "Donquichote Pirates", "Gouvernement Mondial", "CP-AIGIS0",
                "Famille Kozuki", "Famille Riku", "Famille Vinsmoke",
                "Principauté de Mokomo", "Famille Neptune"
            ];
        
            let filteredCharacters = characters.filter(character => {
                // 🔹 Vérifie si le personnage correspond à la recherche
                const matchesSearch = character.name.toLowerCase().includes(searchTerm) ||
                    (Array.isArray(character.aliases) && character.aliases.some(alias => alias.toLowerCase().includes(searchTerm)));
        
                // 🔹 Vérifie si le personnage correspond au genre sélectionné
                const matchesGender = selectedGender === "all" || character.gender === selectedGender;
        
                // 🔹 Vérifie si le personnage appartient à l'affiliation sélectionnée
                let matchesAffiliation = false;
                if (selectedAffiliation === "all") {
                    matchesAffiliation = true; // Afficher tout
                } else if (selectedAffiliation === "Autre") {
                    matchesAffiliation = !predefinedAffiliations.includes(character.affiliation);
                } else {
                    matchesAffiliation = character.affiliation === selectedAffiliation;
                }
        
                // 🔹 Vérifie si le personnage correspond au filtre de Haki
                const hakiArray = character.haki ? character.haki.split(', ') : [];
                const hakiCount = hakiArray.length;
                let matchesHaki = false;
        
                if (selectedHaki === "all") {
                    matchesHaki = true;
                } else if (selectedHaki === "3" && hakiCount === 3) {
                    matchesHaki = true;
                } else if (selectedHaki === "2" && hakiCount === 2) {
                    matchesHaki = true;
                } else if (selectedHaki === "1" && hakiCount === 1) {
                    matchesHaki = hakiArray.includes("Armement") || hakiArray.includes("Vision");
                } else if (selectedHaki === "0") {
                    matchesHaki = !character.haki || character.haki.trim() === "" || character.haki.toLowerCase() === "aucun";
                }
        
                // 🔹 Vérifie si la prime est dans l'intervalle défini
                let matchesBounty = true;
                if (character.bounty) {
                    const bountyValue = parseInt(character.bounty.replace(/[^0-9]/g, ""), 10) || 0;
                    matchesBounty = bountyValue >= minBounty && bountyValue <= maxBounty;
                }
        
                // ✅ **Nouveau** : Vérifie si le personnage appartient à l'arc sélectionné
                const matchesArc = selectedArc === "all" || character.firstArc === selectedArc;
        
                return matchesSearch && matchesGender && matchesAffiliation && matchesHaki && matchesBounty && matchesArc;
            });
        
            displayCharacters(filteredCharacters);
            updateCharacterCount(filteredCharacters.length);
        }        

        // Appliquer le filtre sur la recherche et la sélection du genre
        searchInput.addEventListener("input", filterCharacters);
        genderFilter.addEventListener("change", filterCharacters);
        affiliationFilter.addEventListener("change", filterCharacters);
        hakiFilter.addEventListener("change", filterCharacters);
        document.getElementById("bountyMin").addEventListener("input", filterCharacters);
        document.getElementById("bountyMax").addEventListener("input", filterCharacters);
        document.getElementById("arcFilter").addEventListener("change", filterCharacters);


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
