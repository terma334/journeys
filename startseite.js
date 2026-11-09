
(function () {

    // =========================================
    // REISEDATEN
    // =========================================

    const startseitenReisen = [

        {
            name: "Island",
            jahr: "2026",
            beschreibung: "Roadtrip mit Kerstin",
            link: "2026Iceland/index.html",
            bild: "startseite/island.jpg",
            flagge: "https://flagcdn.com/w160/is.png",
            stempelText: "ICELAND",
            stempelTyp: "island",
            symbol: "❄",
            winkel: "-3deg",
            stempelOben: "18px",
            stempelLinks: "20px",
            stempelRechts: "",
            passOben: "20px",
            passRechts: "225px"
        },

        {
            name: "Northumbria & Edingburgh",
            jahr: "2026",
            beschreibung: "Military Tattoo",
            link: "2026GB/index.html",
            bild: "startseite/grossbritannien.jpg",
            flagge: "https://flagcdn.com/w160/gb.png",
            stempelText: "UNITED KINGDOM",
            stempelTyp: "uk",
            symbol: "♛",
            winkel: "2deg",
            stempelOben: "10px",
            stempelLinks: "",
            stempelRechts: "10px",
            passOben: "15px",
            passRechts: "35px"
        },

        {
            name: "Sri Lanka",
            jahr: "2026",
            beschreibung: "Weroad 360°",
            link: "2026SriLanka/index.html",
            bild: "startseite/sri-lanka.jpg",
            flagge: "https://flagcdn.com/w160/lk.png",
            stempelText: "SRI LANKA",
            stempelTyp: "sri-lanka",
            symbol: "🐘",
            winkel: "-2deg",
            stempelOben: "8px",
            stempelLinks: "5px",
            stempelRechts: "",
            passOben: "25px",
            passRechts: "155px"
        }

    ];


    // =========================================
    // POSTKARTEN ERZEUGEN
    // =========================================

    function startseiteErstellen() {

        const container = document.getElementById("reise-karten");

        // Falls kein Kartenbereich vorhanden ist:
        // Funktion ohne Fehler beenden.
        if (!container) {
            console.warn("Reisekarten-Container nicht gefunden.");
            return;
        }

        // Vorhandene Karten entfernen
        container.replaceChildren();

        startseitenReisen.forEach(function (reise) {

            try {

                const karte = document.createElement("a");

                karte.href = reise.link;
                karte.className = "startseiten-karte " + reise.stempelTyp;

                karte.style.setProperty(
                    "--karten-winkel",
                    reise.winkel
                );

                // Karteninhalt erzeugen
                karte.innerHTML = `

                    <div class="karten-bild">

                        <img
                            src="${reise.bild}"
                            alt="${reise.name}"
                            loading="lazy"
                        >

                        <div class="briefmarke briefmarke-${reise.stempelTyp}">

                            <div class="marken-inhalt">

                                <img
                                    src="${reise.flagge}"
                                    alt="Flagge"
                                >

                                <span>${reise.stempelText}</span>

                            </div>

                            <div class="marken-wert">✈</div>

                        </div>


                        <div class="pass-stempel pass-${reise.stempelTyp}">

                            <span class="pass-symbol">${reise.symbol}</span>

                            <span class="pass-text">2026</span>

                            <span class="pass-land">${reise.stempelText}</span>

                        </div>

                    </div>


                    <div class="karten-information">

                        <h2>${reise.name} · ${reise.jahr}</h2>

                        <p>${reise.beschreibung}</p>

                        <div class="reise-ansehen">

                            Reise ansehen <span>→</span>

                        </div>

                    </div>

                `;


                // =================================
                // BRIEFMARKE POSITIONIEREN
                // =================================

                const marke = karte.querySelector(".briefmarke");

                if (marke) {

                    marke.style.top = reise.stempelOben || "auto";
                    marke.style.left = reise.stempelLinks || "auto";
                    marke.style.right = reise.stempelRechts || "auto";

                }


                // =================================
                // PASSSTEMPEL POSITIONIEREN
                // =================================

                const pass = karte.querySelector(".pass-stempel");

                if (pass) {

                    pass.style.top = reise.passOben || "auto";
                    pass.style.right = reise.passRechts || "auto";

                }


                // Karte zum Kartenbereich hinzufügen
                container.appendChild(karte);

            } catch (fehler) {

                console.error(
                    "Fehler beim Erzeugen der Reisekarte:",
                    reise.name,
                    fehler
                );

            }

        });


        console.log(
            startseitenReisen.length + " Reisekarten verarbeitet."
        );

    }


    // =========================================
    // STARTSEITE INITIALISIEREN
    // =========================================

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            startseiteErstellen,
            { once: true }
        );

    } else {

        startseiteErstellen();

    }

})();
