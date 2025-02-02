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
            // Désactiver l'élément actif actuel
            if (activeIndex >= 0) {
                suggestions[activeIndex].classList.remove('active');
            }

            // Activer le suivant (ou le premier)
            activeIndex = (activeIndex + 1) % suggestions.length;
            suggestions[activeIndex].classList.add('active');

            // Mettre à jour la valeur de l'input avec le texte de la suggestion active
            inputField.value = suggestions[activeIndex].textContent.trim();
        }
    }

    if (event.key === 'ArrowUp') {
        event.preventDefault(); // Empêche le comportement par défaut
        if (suggestions.length > 0) {
            // Désactiver l'élément actif actuel
            if (activeIndex >= 0) {
                suggestions[activeIndex].classList.remove('active');
            }

            // Activer le précédent (ou le dernier)
            activeIndex = (activeIndex - 1 + suggestions.length) % suggestions.length;
            suggestions[activeIndex].classList.add('active');

            // Mettre à jour la valeur de l'input avec le texte de la suggestion active
            inputField.value = suggestions[activeIndex].textContent.trim();
        }
    }

    if (event.key === 'Enter') {
        event.preventDefault(); // Empêcher la soumission par défaut du formulaire

        if (activeIndex >= 0 && suggestions.length > 0) {
            // Simuler un clic sur la suggestion active si elle existe
            suggestions[activeIndex].click();
        } else if (inputField.value.trim() !== '') {
            console.log("🚀 Bouton cliqué via la touche Entrée !");
            submitButton.click(); // Simuler un clic sur le bouton
        } else {
            console.warn("⚠️ L'input est vide, aucune action.");
        }
    }
});