document.addEventListener("DOMContentLoaded", function () {
    const scrollDownBtn = document.getElementById("scrollDown");
    const scrollUpBtn = document.getElementById("scrollUp");

    // ✅ Descend en bas de la page
    scrollDownBtn.addEventListener("click", function () {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    });

    // ✅ Remonte en haut de la page
    scrollUpBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // ✅ Gère l'affichage des flèches
    window.addEventListener("scroll", function () {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollPosition < documentHeight - windowHeight - 100) {
            scrollDownBtn.classList.add("visible");
        } else {
            scrollDownBtn.classList.remove("visible");
        }

        if (scrollPosition > 100) {
            scrollUpBtn.classList.add("visible");
        } else {
            scrollUpBtn.classList.remove("visible");
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.guessPerso img').addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    document.querySelector('.devilFruit img').addEventListener('click', () => {
        window.location.href = '../DevilFruit/devilfruit.html';
    });

    document.querySelector('.vs img').addEventListener('click', () => {
        window.location.href = '../Alphabet/alphabet.html';
    });

    document.querySelector('.characters img').addEventListener('click', () => {
        window.location.href = '../Characters/character.html';
    });

    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'index.html') {
        document.querySelector('.guessPerso img').style.filter = 'drop-shadow(0 0 10px #faf9f3)';
    } else if (currentPage === '../DevilFruit/devilfruit.html') {
        document.querySelector('.devilFruit img').style.filter = 'drop-shadow(0 0 10px #faf9f3)';
    } else if (currentPage === 'alphabet.html') {
        document.querySelector('.vs img').style.filter = 'drop-shadow(0 0 10px #faf9f3)';
    } else if (currentPage === '../Characters/character.html') {
        document.querySelector('.characters img').style.filter = 'drop-shadow(0 0 10px #faf9f3)';
    }
});