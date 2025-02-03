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

            const filteredCharacters = characters.filter(character => {
                // Vérifie si le personnage correspond à la recherche
                const matchesSearch = character.name.toLowerCase().includes(searchTerm) ||
                    (Array.isArray(character.aliases) && character.aliases.some(alias => alias.toLowerCase().includes(searchTerm)));

                // Vérifie si le personnage correspond au genre sélectionné
                const matchesGender = selectedGender === "all" || character.gender === selectedGender;

                // Vérifie si le personnage appartient à l'équipage sélectionné
                const matchesAffiliation = selectedAffiliation === "all" ||
                    (selectedAffiliation === "Autre"
                        ? !["Straw Hat Pirates", "Marines", "Shichibukai", "Yonko", "Revolutionary Army"].includes(character.affiliation)
                        : character.affiliation === selectedAffiliation);

                // Vérifie si le personnage correspond au filtre de Haki
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
                    // ✅ Vérification stricte pour les personnages sans Haki
                    matchesHaki = !character.haki || character.haki === "" || character.haki.toLowerCase() === "aucun";
                }


                return matchesSearch && matchesGender && matchesAffiliation && matchesHaki;
            });

            displayCharacters(filteredCharacters);
            updateCharacterCount(filteredCharacters.length);
        }

        // Appliquer le filtre sur la recherche et la sélection du genre
        searchInput.addEventListener("input", filterCharacters);
        genderFilter.addEventListener("change", filterCharacters);
        affiliationFilter.addEventListener("change", filterCharacters);
        hakiFilter.addEventListener("change", filterCharacters);

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

    } catch (error) {
        console.error("Erreur lors du chargement des personnages :", error);
        container.innerHTML = "<p>Impossible de charger les personnages.</p>";
    }
});
