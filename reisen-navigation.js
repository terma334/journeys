
const basisPfad = "https://terma334.github.io/journeys/";

const reiseJahre = [
    {
        jahr: "2027",
        reisen: [
            { name: "Dummy", link: "https://terma334.github.io/2026SriLanka/index.html" },
        ]
    },
    {
        jahr: "2026",
        reisen: [
            { name: "Island", link: "https://terma334.github.io/2026Island/index.html" },
            { name: "Großbritannien", link: "https://terma334.github.io/2026GB/index.html" },
            { name: "Sri Lanka", link: "https://terma334.github.io/2026SriLanka/index.html" },
        ]
    },
    {
        jahr: "2025",
        reisen: [
            { name: "London", link: "https://terma334.github.io/2025London/index.html" },
            { name: "Teneriffa", link: "https://terma334.github.io/2025Teneriffa/index.html" },
            { name: "Finstermühle", link: "https://terma334.github.io/2025Finstermühle/index.html" },
        ]
    },
    {
        jahr: "2024-2021",
        reisen: [
            { name: "Türkei", link: "https://terma334.github.io/old/2024Turkei/index.html" },
            { name: "Holland", link: "https://terma334.github.io/old/2024Holland/index.html" },
            { name: "Hamburg", link: "https://terma334.github.io/old/2023Hamburg/index.html" },
            { name: "Azoren", link: "https://terma334.github.io/old/2022Azoren/index.html" },
            { name: "Belgien", link: "https://terma334.github.io/old/2021Belgien/index.html" },
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

            // Einzelne Reise direkt über ihre vollständige URL aufrufen
            link.href = reise.link;

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
