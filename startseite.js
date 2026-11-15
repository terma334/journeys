
(function () {

    // =========================================
    // REISEDATEN
    // =========================================

    const startseitenReisen = [

        {
            name: "Island",
            jahr: "2026",
            beschreibung: "Roadtrip mit Kerstin ",
            link: "https://terma334.github.io/2026Island/index.html",
            bild: "https://terma334.github.io/2026Island/pictures/Tag6/2.jpg",
            flagge: "https://flagcdn.com/w160/is.png",
            stempelText: "Ísland",
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
            link: "https://terma334.github.io/2026GB/index.html",
            bild: "https://terma334.github.io/2026GB/pictures/Tag2/b/9.jpg",
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
            link: "https://terma334.github.io/2026SriLanka/index.html",
            bild: "https://terma334.github.io/2026SriLanka/pictures/Tag3/a/6.jpg",
            flagge: "https://flagcdn.com/w160/lk.png",
            stempelText: "ශ්‍රී ලංකා",
            stempelTyp: "sri-lanka",
            symbol: "🐘",
            winkel: "-2deg",
            stempelOben: "8px",
            stempelLinks: "5px",
            stempelRechts: "",
            passOben: "25px",
            passRechts: "155px"
        },

        {
            name: "London",
            jahr: "2025",
            beschreibung: "Citytrip",
            link: "https://terma334.github.io/2025London/index.html",
            bild: "https://terma334.github.io/2025London/pictures/Tag2/8.jpg",
            flagge: "https://flagcdn.com/w160/gb.png",
            stempelText: "LONDON",
            stempelTyp: "london",
            symbolBild: "startseite/stempel/london-stempel.svg",
            winkel: "-2deg",
            stempelOben: "8px",
            stempelLinks: "5px",
            stempelRechts: "",
            passOben: "25px",
            passRechts: "155px"
        },

        {
            name: "Teneriffa",
            jahr: "2025",
            beschreibung: "",
            link: "https://terma334.github.io/2025Teneriffa/index.html",
            bild: "https://terma334.github.io/2025Teneriffa/pictures/Tag4/2.jpg",
            flagge: "https://flagcdn.com/w160/es.png",
            stempelText: "TENERIFE",
            stempelTyp: "teneriffa",
            symbolBild: "startseite/stempel/teneriffa-stempel.svg",
            winkel: "-10deg",
            stempelOben: "8px",
            stempelLinks: "200px",
            stempelRechts: "",
            passOben: "25px",
            passRechts: "20px"
        },

        {
            name: "Finstermühle",
            jahr: "2025",
            beschreibung: "Family°",
            link: "https://terma334.github.io/2025Finstermuhle/index.html",
            bild: "https://terma334.github.io/2025Finstermuhle/pictures/Tag2/6.jpg",
            flagge: "https://flagcdn.com/w160/de.png",
            stempelText: "Finster mühle",
            stempelTyp: "finstermühle",
            symbolBild: "startseite/stempel/finstermuhle-stempel.svg",
            winkel: "-2deg",
            stempelOben: "8px",
            stempelLinks: "5px",
            stempelRechts: "",
            passOben: "8px",
            passRechts: "180px"
        },

        {
            name: "Türkei",
            jahr: "2024",
            beschreibung: "Strandurlaub",
            link: "https://terma334.github.io/old/2024Turkei/index.html",
            bild: "https://terma334.github.io/old/2024Turkei/pictures/Tag1/1.jpg",
            flagge: "https://flagcdn.com/w160/tr.png",
            stempelText: "Türkiye",
            stempelTyp: "türkei",
            symbolBild: "startseite/stempel/turkei-stempel.svg",
            winkel: "-2deg",
            stempelOben: "8px",
            stempelLinks: "5px",
            stempelRechts: "",
            passOben: "25px",
            passRechts: "155px"
        },
        {
            name: "Holland",
            jahr: "2024",
            beschreibung: "Amsterdam & Texel",
            link: "https://terma334.github.io/old/2024Holland/index.html",
            bild: "https://terma334.github.io/old/2024Holland/pictures/Tag2/6.jpg",
            flagge: "https://flagcdn.com/w160/nl.png",
            stempelText: "NEDERLAND",
            stempelTyp: "holland",
            symbolBild: "startseite/stempel/holland-stempel.svg",
            winkel: "-2deg",
            stempelOben: "8px",
            stempelLinks: "5px",
            stempelRechts: "",
            passOben: "25px",
            passRechts: "155px"
        },

        {
            name: "Hamburg",
            jahr: "2023",
            beschreibung: "König der Löwen",
            link: "https://terma334.github.io/old/2023Hamburg/index.html",
            bild: "https://terma334.github.io/old/2023Hamburg/pictures/Tag2/6.jpg",
            flagge: "https://flagcdn.com/w160/de.png",
            stempelText: "HH",
            stempelTyp: "hamburg",
            symbolBild: "startseite/stempel/hamburg-stempel.svg",
            winkel: "-2deg",
            stempelOben: "8px",
            stempelLinks: "5px",
            stempelRechts: "",
            passOben: "25px",
            passRechts: "155px"
        },

        {
            name: "Azoren",
            jahr: "2022",
            beschreibung: "Inselhopping",
            link: "https://terma334.github.io/old/2022Azoren/index.html",
            bild: "https://terma334.github.io/old/2022Azoren/pictures/Tag2/6.jpg",
            flagge: "https://flagcdn.com/w160/pt.png",
            stempelText: "Açores",
            stempelTyp: "azoren",
            symbolBild: "startseite/stempel/azoren-stempel.svg",
            winkel: "-2deg",
            stempelOben: "8px",
            stempelLinks: "5px",
            stempelRechts: "",
            passOben: "25px",
            passRechts: "155px"
        },

        {
            name: "Belgien",
            jahr: "2021",
            beschreibung: "Waterloo",
            link: "https://terma334.github.io/old/2021Belgien/index.html",
            bild: "https://terma334.github.io/old/2021Belgien/pictures/Tag2/6.jpg",
            flagge: "https://flagcdn.com/w160/be.png",
            stempelText: "BELGIQUE",
            stempelTyp: "belgien",
            symbolBild: "startseite/stempel/belgien-stempel.svg",
            winkel: "-2deg",
            stempelOben: "8px",
            stempelLinks: "5px",
            stempelRechts: "",
            passOben: "25px",
            passRechts: "155px"
        },

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


                // =================================
                // STEMPELSYMBOL ERZEUGEN
                // =================================

                const symbolHtml = reise.symbolBild

                    ? `
                        <img
                            class="pass-symbol pass-symbol-bild"
                            src="${reise.symbolBild}"
                            alt=""
                            style="width:52px;height:52px;object-fit:contain;"
                        >
                    `

                    : `
                        <span class="pass-symbol">${reise.symbol || ""}</span>
                    `;


                // =================================
                // KARTENINHALT ERZEUGEN
                // =================================

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

                            ${symbolHtml}

                            <span class="pass-text">${reise.jahr}</span>

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
