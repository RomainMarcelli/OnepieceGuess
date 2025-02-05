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
