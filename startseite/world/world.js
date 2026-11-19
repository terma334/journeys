
(function () {

    const mapContainer = document.getElementById("world-map");

    if (!mapContainer) {
        console.warn("Weltkarten-Container nicht gefunden.");
        return;
    }

    window.reisedatenLaden
        .then(daten => {

            const reisen = daten.reisen;

            // Länder, die bereits besucht wurden, aber keine Reiseseite haben
            const weitereBereisteLaender = new Set(
                daten.weitereBereisteLaender || []
            );
            const laenderNamen = daten.laenderNamen || {};

            fetch("startseite/world/world-map.svg")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Weltkarte konnte nicht geladen werden.");
                    }
                    return response.text();
                })
                .then(svgText => {

                    const parser = new DOMParser();
                    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                    const svg = svgDoc.documentElement;

                    if (svg.tagName.toLowerCase() !== "svg") {
                        throw new Error("Ungültige SVG-Datei.");
                    }

                    svg.style.width = "100%";
                    svg.style.height = "auto";
                    svg.style.display = "block";

                    mapContainer.appendChild(document.importNode(svg, true));

                    const countries = mapContainer.querySelectorAll(".country");

                    countries.forEach(country => {
                        country.style.fill = "#252525";
                        country.style.stroke = "#555555";
                        country.style.strokeWidth = "1.2";
                        country.style.transition = "fill 0.2s ease";
                    });

                    const infoBox = document.getElementById("country-info");

                    if (!infoBox) {
                        console.warn("Länder-Infobox nicht gefunden.");
                        return;
                    }

                    let aktivesLand = null;
                    let ausblendTimer = null;

                    // Infobox an einer passenden Bildschirmposition anzeigen
                    function positionieren(x, y) {

                        const abstand = 12;
                        const breite = infoBox.offsetWidth;
                        const hoehe = infoBox.offsetHeight;

                        let links = x + 18;
                        let oben = y + 18;

                        if (links + breite > window.innerWidth - abstand) {
                            links = x - breite - 18;
                        }

                        if (oben + hoehe > window.innerHeight - abstand) {
                            oben = y - hoehe - 18;
                        }

                        links = Math.max(abstand, Math.min(links, window.innerWidth - breite - abstand));
                        oben = Math.max(abstand, Math.min(oben, window.innerHeight - hoehe - abstand));

                        infoBox.style.left = links + "px";
                        infoBox.style.top = oben + "px";
                    }

                    function landAnzeigen(code, x, y) {

                        const landReisen = reisen.filter(reise =>
                            Array.isArray(reise.laender) &&
                            reise.laender.includes(code)
                        );

                        infoBox.replaceChildren();

                        const titel = document.createElement("h3");
                        titel.textContent = laenderNamen[code] || code;
                        infoBox.appendChild(titel);

                        landReisen.forEach(reise => {

                            const reiseBereich = document.createElement("a");

                            reiseBereich.className = "country-reise";
                            reiseBereich.href = reise.link;
                            reiseBereich.style.display = "block";
                            reiseBereich.style.color = "inherit";
                            reiseBereich.style.textDecoration = "none";

                            if (reise.bild) {
                                const bild = document.createElement("img");
                                bild.src = reise.bild;
                                bild.alt = reise.name;
                                reiseBereich.appendChild(bild);
                            }

                            const reiseTitel = document.createElement("h4");
                            reiseTitel.textContent = reise.name + " · " + reise.jahr;
                            reiseBereich.appendChild(reiseTitel);

                            if (reise.beschreibung) {
                                const beschreibung = document.createElement("p");
                                beschreibung.textContent = reise.beschreibung;
                                reiseBereich.appendChild(beschreibung);
                            }

                            infoBox.appendChild(reiseBereich);
                        });

                        infoBox.style.display = "block";
                        positionieren(x, y);
                        aktivesLand = code;
                    }

                    function infoboxSchliessen() {
                        infoBox.style.display = "none";
                        aktivesLand = null;
                    }

                    function ausblendenVerzoegern() {
                        clearTimeout(ausblendTimer);

                        ausblendTimer = setTimeout(() => {
                            infoboxSchliessen();
                        }, 250);
                    }

                    // Länder mit eigener Reiseseite ermitteln
                    const laenderMitReiseseite = new Set();

                    reisen.forEach(reise => {
                        if (Array.isArray(reise.laender)) {
                            reise.laender.forEach(code => {
                                laenderMitReiseseite.add(code);
                            });
                        }
                    });

                    // Länder mit Reiseseite: weiß und interaktiv
                    
laenderMitReiseseite.forEach(code => {

    // Alle Flächen eines Landes finden (Festland und Inseln)
    const countryElements = mapContainer.querySelectorAll(
        `.country[id="${code}"], .country[data-country="${code}"]`
    );

    if (!countryElements.length) {
        console.warn("Land nicht gefunden:", code);
        return;
    }

    countryElements.forEach(country => {

        country.style.fill = "#ffffff";
        country.style.cursor = "pointer";

        // PC: Maus über ein Land bewegen
        country.addEventListener("pointerenter", event => {

            if (event.pointerType !== "mouse") return;

            clearTimeout(ausblendTimer);

            country.style.fill = "#39c879";

            landAnzeigen(code, event.clientX, event.clientY);
        });

        country.addEventListener("pointermove", event => {

            if (event.pointerType !== "mouse") return;

            if (aktivesLand === code) {
                positionieren(event.clientX, event.clientY);
            }
        });

        country.addEventListener("pointerleave", event => {

            if (event.pointerType !== "mouse") return;

            country.style.fill = "#ffffff";
            ausblendenVerzoegern();
        });

        // Smartphone und Tablet: Land antippen
        country.addEventListener("click", event => {

            if (event.pointerType === "mouse") return;

            event.stopPropagation();

            clearTimeout(ausblendTimer);

            if (aktivesLand === code && infoBox.style.display === "block") {
                infoboxSchliessen();
                return;
            }

            country.style.fill = "#39c879";

            const rechteck = country.getBoundingClientRect();

            landAnzeigen(
                code,
                rechteck.left + rechteck.width / 2,
                rechteck.top + rechteck.height / 2
            );
        });

    });
});


                    // Weitere bereiste Länder: hellgrau und ohne Interaktion
                    weitereBereisteLaender.forEach(code => {

                        // Ein Land mit Reiseseite bleibt weiß und interaktiv
                        if (laenderMitReiseseite.has(code)) return;

                        const country = mapContainer.querySelector(
                            `.country[id="${code}"]`
                        );

                        if (!country) {
                            console.warn("Land nicht gefunden:", code);
                            return;
                        }

                        country.style.fill = "#d3d3d3";
                        country.style.cursor = "default";
                    });

                    // Maus darf von einem Land in die Infobox wechseln
                    infoBox.addEventListener("pointerenter", event => {
                        if (event.pointerType === "mouse") {
                            clearTimeout(ausblendTimer);
                        }
                    });

                    infoBox.addEventListener("pointerleave", event => {
                        if (event.pointerType === "mouse") {
                            ausblendenVerzoegern();
                        }
                    });

                    // Tippen außerhalb der Infobox schließt sie
                    document.addEventListener("click", event => {

                        if (infoBox.contains(event.target)) return;

                        if (event.target.closest && event.target.closest(".country")) return;

                        infoboxSchliessen();
                    });

                    // Beim Ändern der Bildschirmgröße Position korrigieren
                    window.addEventListener("resize", () => {

                        if (infoBox.style.display === "block") {

                            const links = parseFloat(infoBox.style.left) || 0;
                            const oben = parseFloat(infoBox.style.top) || 0;

                            positionieren(links, oben);
                        }
                    });

                    console.log("Weltkarte erfolgreich geladen!");
                    console.log("Länder mit Reiseseite:", [...laenderMitReiseseite]);
                    console.log("Weitere bereiste Länder:", [...weitereBereisteLaender]);

                })
                .catch(error => {
                    console.error("Fehler beim Laden der Weltkarte:", error);
                });

        })
        .catch(error => {
            console.error("Reisedaten für die Weltkarte konnten nicht geladen werden:", error);
        });

})();
