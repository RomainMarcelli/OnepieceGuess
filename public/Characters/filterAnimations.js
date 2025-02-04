document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll(".filters select");

    filters.forEach(filter => {
        filter.addEventListener("change", () => {
            filter.classList.add("highlight");
            setTimeout(() => filter.classList.remove("highlight"), 300);
        });
    });
});

/* Ajout dynamique du style pour effet de glow */
const style = document.createElement("style");
style.innerHTML = `
@keyframes glow {
    0% { box-shadow: 0px 0px 5px rgba(255, 215, 0, 0.5); }
    50% { box-shadow: 0px 0px 15px rgba(255, 215, 0, 0.9); }
    100% { box-shadow: 0px 0px 5px rgba(255, 215, 0, 0.5); }
}
.highlight {
    animation: glow 0.5s ease-in-out;
}
`;
document.head.appendChild(style);
