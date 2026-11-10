const basisPfad = "/journeys/";


const reiseJahre = [
    {
        jahr: "2027",
        reisen: [
            { name: "Dummy", link: "2026SriLanka/index.html" },
        ]
    },
    {
        jahr: "2026",
        reisen: [
            { name: "Island", link: "2026Iceland/index.html" },
            { name: "Großbritannien", link: "2026GB/index.html" },
            { name: "Sri Lanka", link: "2026SriLanka/index.html" },
        ]
    },
];




function reisenNavigationErstellen() {

    const container = document.getElementById("reisen-links");

    if (!container) return;

    container.innerHTML = `
        <a href="${basisPfad}index.html"
           class="reiseuebersicht-link"
           onclick="toggleMenu()">

            Reiseübersicht

        </a>
    `;

    reiseJahre.forEach(gruppe => {

        const details = document.createElement("details");

        details.className = "reise-jahr-dropdown";
        details.dataset.jahr = gruppe.jahr;

        // Gespeicherten Zustand wiederherstellen

        details.open = localStorage.getItem(
            "reisejahr-" + gruppe.jahr
        ) === "true";

        details.innerHTML = `
            <summary>${gruppe.jahr}</summary>
            <div class="reise-jahr-links"></div>
        `;

        const links = details.querySelector(".reise-jahr-links");

        gruppe.reisen.forEach(reise => {

            const link = document.createElement("a");

            link.href = basisPfad + reise.link;
            link.textContent = reise.name;
            link.onclick = toggleMenu;

            links.appendChild(link);

        });

        // Änderungen am Aufklappzustand speichern

        details.addEventListener("toggle", () => {

            localStorage.setItem(
                "reisejahr-" + gruppe.jahr,
                details.open
            );

        });

        container.appendChild(details);

    });

}


document.addEventListener("DOMContentLoaded", reisenNavigationErstellen);

