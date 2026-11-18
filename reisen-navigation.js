
(function () {

    const basisPfad = "https://terma334.github.io/journeys/";

    function reisenNavigationErstellen(daten) {

        const container = document.getElementById("reisen-links");

        if (!container) return;

        container.innerHTML = `

            <a href="${basisPfad}index.html"
               class="reiseuebersicht-link"
               onclick="toggleMenu()">

                Reiseübersicht

            </a>

        `;

        daten.navigation.gruppen.forEach(gruppe => {

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

            gruppe.reisen.forEach(reiseId => {

                const reise = daten.reisen.find(
                    eintrag => eintrag.id === reiseId
                );

                if (!reise) {
                    console.warn("Reise nicht gefunden:", reiseId);
                    return;
                }

                const link = document.createElement("a");

                link.href = reise.link;
                link.textContent = reise.navigationsName || reise.name;
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

    // Erst starten, wenn die JSON-Daten geladen sind

    window.reisedatenLaden
        .then(reisenNavigationErstellen)
        .catch(fehler => {

            console.error(
                "Reisenavigation konnte nicht erstellt werden:",
                fehler
            );

        });

})();
