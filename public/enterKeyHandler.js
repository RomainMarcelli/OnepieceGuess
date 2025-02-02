document.addEventListener('keydown', (event) => {
    const inputField = document.getElementById('characterInput'); // Récupérer l'input
    const submitButton = document.getElementById('button'); // Récupérer le bouton
    const suggestionsDiv = document.getElementById('suggestions'); // Récupérer la liste des suggestions

    // Vérifier si les éléments existent
    if (!inputField || !submitButton || !suggestionsDiv) {
        console.error("❌ Erreur : 'characterInput', 'button' ou 'suggestions' introuvable.");
        return;
    }

    const suggestions = Array.from(suggestionsDiv.querySelectorAll('.suggestion')); // Liste des suggestions
    let activeIndex = suggestions.findIndex((item) => item.classList.contains('active')); // Trouver l'élément actif

    if (event.key === 'ArrowDown') {
        event.preventDefault(); // Empêche le comportement par défaut
        if (suggestions.length > 0) {
            if (activeIndex >= 0) {
                suggestions[activeIndex].classList.remove('active');
            }
            activeIndex = (activeIndex + 1) % suggestions.length;
            suggestions[activeIndex].classList.add('active');
            inputField.value = suggestions[activeIndex].textContent.trim();
        }
    }

    if (event.key === 'ArrowUp') {
        event.preventDefault(); // Empêche le comportement par défaut
        if (suggestions.length > 0) {
            if (activeIndex >= 0) {
                suggestions[activeIndex].classList.remove('active');
            }
            activeIndex = (activeIndex - 1 + suggestions.length) % suggestions.length;
            suggestions[activeIndex].classList.add('active');
            inputField.value = suggestions[activeIndex].textContent.trim();
        }
    }

    if (event.key === 'Enter') {
        event.preventDefault(); // Empêcher la soumission par défaut du formulaire
    
        if (activeIndex >= 0 && suggestions.length > 0) {
            // Valider le personnage actif sélectionné avec les flèches
            inputField.value = suggestions[activeIndex].textContent.trim();
            suggestions[activeIndex].click();
        } else if (suggestions.length > 0) {
            // Si aucune flèche n'a été utilisée, sélectionner automatiquement la première suggestion
            inputField.value = suggestions[0].textContent.trim();
            suggestions[0].click();
        } else if (inputField.value.trim() !== '') {
            console.log("🚀 Bouton cliqué via la touche Entrée !");
            submitButton.click(); // Simuler un clic sur le bouton
        } else {
            console.warn("⚠️ L'input est vide, aucune action.");
        }
    }    
});

// ✅ Validation en cliquant sur une suggestion
document.addEventListener('click', (event) => {
    const clickedSuggestion = event.target.closest('.suggestion');
    if (clickedSuggestion) {
        const inputField = document.getElementById('characterInput');
        const submitButton = document.getElementById('button');

        inputField.value = clickedSuggestion.textContent.trim();
        submitButton.click(); // Valider immédiatement la réponse
    }
});

// ✅ Validation automatique en cliquant sur le bouton
document.getElementById('button').addEventListener('click', () => {
    const inputField = document.getElementById('characterInput');
    const suggestionsDiv = document.getElementById('suggestions');
    const suggestions = Array.from(suggestionsDiv.querySelectorAll('.suggestion'));

    if (suggestions.length > 0) {
        inputField.value = suggestions[0].textContent.trim(); // Sélectionner la première suggestion automatiquement
    }
});
