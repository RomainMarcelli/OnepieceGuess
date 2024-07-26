function updateHintInfo() {
    const typeHintInfo = document.getElementById('typeHintInfo');
    const traduitFruitHintInfo = document.getElementById('traduitFruitHintInfo');

    const firstArcHintInfo = document.getElementById('firstArcHintInfo');
    const devilFruitHintInfo = document.getElementById('devilFruitHintInfo');

    const firstArcHintImage = document.getElementById('firstArcHintImage');
    const devilFruitHintImage = document.getElementById('devilFruitHintImage');

    const typeHintImage = document.getElementById('typeHintImage');
    const traduitFruitHintImage = document.getElementById('traduitFruitHintImage');

    const typeHint = document.querySelector('#typeHint');
    const traduitFruitHint = document.querySelector('#traduitFruitHint');

    const firstArcHint = document.querySelector('#firstArcHint');
    const devilFruitHint = document.querySelector('#devilFruitHint');

    const typeHintP = document.querySelector('#typeHint p');
    const traduitFruitHintP = document.querySelector('#traduitFruitHint p');
    
    const firstArcHintP = document.querySelector('#firstArcHint p');
    const devilFruitHintP = document.querySelector('#devilFruitHint p');

    const attemptsForTypeHint = 4; // Affichage au bout de 4 essais
    const attemptsForTraduitFruitHint = 7; // Affichage au bout de 7 essais

    const attemptsForFirstArcHint = 6; // Affichage au bout de 6 essais
    const attemptsForDevilFruitHint = 9; // Affichage au bout de 9 essais

    const remainingAttemptsForTypeHint = Math.max(0, attemptsForTypeHint - attempts);
    const remainingAttemptsForTraduitFruitHint = Math.max(0, attemptsForTraduitFruitHint - attempts);

    const remainingAttemptsForFirstArcHint = Math.max(0, attemptsForFirstArcHint - attempts);
    const remainingAttemptsForDevilFruitHint = Math.max(0, attemptsForDevilFruitHint - attempts);

    if (remainingAttemptsForFirstArcHint > 0) {
        firstArcHintInfo.textContent = `Dans ${remainingAttemptsForFirstArcHint} Essais`;
        firstArcHintInfo.style.display = 'block';
        firstArcHintImage.style.filter = ''; // Réinitialiser le filtre si les essais ne sont pas atteints
    } else {
        firstArcHintInfo.textContent = `Indice du premier arc : ${selectedCharacter.firstArc}`;
        firstArcHintInfo.style.display = 'none';
        firstArcHint.style.border = '2px solid #928157';
        firstArcHintP.style.color = '#928157'; 
        firstArcHintImage.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(60%) saturate(2369%) hue-rotate(353deg) brightness(100%) contrast(102%)';
    }

    if (remainingAttemptsForDevilFruitHint > 0) {
        devilFruitHintInfo.textContent = `Dans ${remainingAttemptsForDevilFruitHint} Essais`;
        devilFruitHintInfo.style.display = 'block';
        devilFruitHintImage.style.filter = ''; // Réinitialiser le filtre si les essais ne sont pas atteints
    } else {
        devilFruitHintInfo.textContent = `Indice du fruit du démon : ${selectedCharacter.devilFruit}`;
        devilFruitHintInfo.style.display = 'none';
        devilFruitHint.style.border = '2px solid #928157';
        devilFruitHintP.style.color = '#928157';
        devilFruitHintImage.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(60%) saturate(2369%) hue-rotate(353deg) brightness(100%) contrast(102%)';
    }

    if (remainingAttemptsForTypeHint > 0) {
        typeHintInfo.textContent = `Dans ${remainingAttemptsForTypeHint} Essais`;
        typeHintInfo.style.display = 'block';
        typeHintImage.style.filter = ''; // Réinitialiser le filtre si les essais ne sont pas atteints
    } else {
        typeHintInfo.textContent = `Indice du type : ${selectedCharacter.type}`;
        typeHintInfo.style.display = 'none';
        typeHint.style.border = '2px solid #928157';
        typeHintP.style.color = '#928157'; 
        typeHintImage.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(60%) saturate(2369%) hue-rotate(353deg) brightness(100%) contrast(102%)';
    }

    if (remainingAttemptsForTraduitFruitHint > 0) {
        traduitFruitHintInfo.textContent = `Dans ${remainingAttemptsForTraduitFruitHint} Essais`;
        traduitFruitHintInfo.style.display = 'block';
        traduitFruitHintImage.style.filter = ''; // Réinitialiser le filtre si les essais ne sont pas atteints
    } else {
        traduitFruitHintInfo.textContent = `Indice traduit : ${selectedCharacter.traduitFruit}`;
        traduitFruitHintInfo.style.display = 'none';
        traduitFruitHint.style.border = '2px solid #928157';
        traduitFruitHintP.style.color = '#928157';
        traduitFruitHintImage.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(60%) saturate(2369%) hue-rotate(353deg) brightness(100%) contrast(102%)';
    }
}

function toggleHint(id) {
    const firstArcHintDisplay = document.getElementById('firstArcHintDisplay');
    const devilFruitHintDisplay = document.getElementById('devilFruitHintDisplay');
    const typeHintDisplay = document.getElementById('typeHintDisplay');
    const traduitFruitHintDisplay = document.getElementById('traduitFruitHintDisplay');

    // Toggle logic for firstArcHintDisplay
    if (id === 'firstArcHintDisplay') {
        if (attempts < 6) {
            return; // Not enough attempts to show the hint
        }

        if (firstArcHintDisplay.style.display === 'none' || firstArcHintDisplay.style.display === '') {
            devilFruitHintDisplay.style.display = 'none';
            typeHintDisplay.style.display = 'none';
            traduitFruitHintDisplay.style.display = 'none';
            firstArcHintDisplay.innerHTML = `Indice du premier arc : ${selectedCharacter.firstArc}`;
            firstArcHintDisplay.style.display = 'block';
        } else {
            firstArcHintDisplay.style.display = 'none';
        }
    }
    // Toggle logic for devilFruitHintDisplay
    else if (id === 'devilFruitHintDisplay') {
        if (attempts < 9) {
            return; // Not enough attempts to show the hint
        }

        if (devilFruitHintDisplay.style.display === 'none' || devilFruitHintDisplay.style.display === '') {
            firstArcHintDisplay.style.display = 'none';
            typeHintDisplay.style.display = 'none';
            traduitFruitHintDisplay.style.display = 'none';
            devilFruitHintDisplay.innerHTML = `Indice du fruit du démon : ${selectedCharacter.devilFruit}`;
            devilFruitHintDisplay.style.display = 'block';
        } else {
            devilFruitHintDisplay.style.display = 'none';
        }
    }
    // Toggle logic for typeHintDisplay
    else if (id === 'typeHintDisplay') {
        if (attempts < 4) {
            return; // Not enough attempts to show the hint
        }

        if (typeHintDisplay.style.display === 'none' || typeHintDisplay.style.display === '') {
            firstArcHintDisplay.style.display = 'none';
            devilFruitHintDisplay.style.display = 'none';
            traduitFruitHintDisplay.style.display = 'none';
            typeHintDisplay.innerHTML = `Indice du type : ${selectedCharacter.type}`;
            typeHintDisplay.style.display = 'block';
        } else {
            typeHintDisplay.style.display = 'none';
        }
    }
    // Toggle logic for traduitFruitHintDisplay
    else if (id === 'traduitFruitHintDisplay') {
        if (attempts < 7) {
            return; // Not enough attempts to show the hint
        }

        if (traduitFruitHintDisplay.style.display === 'none' || traduitFruitHintDisplay.style.display === '') {
            firstArcHintDisplay.style.display = 'none';
            devilFruitHintDisplay.style.display = 'none';
            typeHintDisplay.style.display = 'none';
            traduitFruitHintDisplay.innerHTML = `Indice traduit : ${selectedCharacter.traduitFruit}`;
            traduitFruitHintDisplay.style.display = 'block';
        } else {
            traduitFruitHintDisplay.style.display = 'none';
        }
    }
}


// Fonction pour gérer les indices en fonction des essais
function updateHints() {
    // Met à jour les indices en fonction des essais
    updateHintInfo();
}


// Événements pour afficher ou cacher les indices
document.getElementById('firstArcHint').addEventListener('click', () => {
    toggleHint('firstArcHintDisplay');
});

document.getElementById('devilFruitHint').addEventListener('click', () => {
    toggleHint('devilFruitHintDisplay');
});

document.getElementById('typeHint').addEventListener('click', () => {
    toggleHint('typeHintDisplay');
});

document.getElementById('traduitFruitHint').addEventListener('click', () => {
    toggleHint('traduitFruitHintDisplay');
});


