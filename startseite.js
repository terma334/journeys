
(function () {

    // =========================================
    // POSTKARTEN ERZEUGEN
    // Die Daten kommen aus reisedaten.json
    // =========================================

    function startseiteErstellen(daten) {

        const container = document.getElementById("reise-karten");

        if (!container) {
            console.warn("Reisekarten-Container nicht gefunden.");
            return;
        }

        container.replaceChildren();

        daten.reisen.forEach(function (reise) {

            try {

                const gestaltung = reise.postkarte || {};
                const markenGestaltung = gestaltung.briefmarke || {};
                const passGestaltung = gestaltung.passStempel || {};
                const wasserzeichen = gestaltung.wasserzeichen || {};

                const karte = document.createElement("a");

                karte.href = reise.link;
                karte.className = "startseiten-karte " + (gestaltung.stempelTyp || "");

                karte.style.setProperty(
                    "--karten-winkel",
                    gestaltung.winkel || "0deg"
                );

                // =================================
                // STEMPELSYMBOL ERZEUGEN
                // =================================

                const symbolHtml = gestaltung.symbolBild
                    ? `
                        <span
                            class="pass-symbol pass-symbol-bild"
                            style="
                                width:52px;
                                height:52px;
                                -webkit-mask-image:url('${gestaltung.symbolBild}');
                                mask-image:url('${gestaltung.symbolBild}');
                                background-color:${gestaltung.symbolFarbe || '#77736b'};
                            "
                            aria-hidden="true"
                        ></span>
                    `
: `
    <span
        class="pass-symbol"
        style="color:${gestaltung.symbolFarbe || '#77736b'}"
    >${gestaltung.symbol || ""}</span>
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

                        <div class="briefmarke briefmarke-${gestaltung.stempelTyp || ""}">

                            <div class="marken-inhalt">

                                <img
                                    src="${gestaltung.flagge || ""}"
                                    alt="Flagge"
                                >

                                <span>${gestaltung.stempelText || ""}</span>

                            </div>

                            <div class="marken-wert">✈</div>

                        </div>

                        <div class="pass-stempel pass-${gestaltung.stempelTyp || ""}">

                            ${symbolHtml}

                            <span class="pass-text">${reise.jahr}</span>

                            <span class="pass-land">${gestaltung.stempelText || ""}</span>

                        </div>

                    </div>

                    <div class="karten-information">

                        <h2>${reise.name} · ${reise.jahr}</h2>

                        <p>${reise.beschreibung || ""}</p>

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

                    marke.style.top = gestaltung.stempelOben || "auto";
                    marke.style.left = gestaltung.stempelLinks || "auto";
                    marke.style.right = gestaltung.stempelRechts || "auto";

                    // Individuelle Briefmarkengestaltung

                    if (markenGestaltung.hintergrund) {
                        marke.style.backgroundColor = markenGestaltung.hintergrund;
                    }

                    if (markenGestaltung.rahmen) {
                        marke.style.borderColor = markenGestaltung.rahmen;
                    }

                    if (markenGestaltung.winkel) {
                        marke.style.transform = "rotate(" + markenGestaltung.winkel + ")";
                    }

                    if (markenGestaltung.outline) {
                        marke.style.outline = markenGestaltung.outline;
                    }

                    if (markenGestaltung.outlineOffset) {
                        marke.style.outlineOffset = markenGestaltung.outlineOffset;
                    }

                    const innenrahmen = marke.querySelector(".marken-inhalt");

                    if (innenrahmen && markenGestaltung.innenrahmen) {
                        innenrahmen.style.borderColor = markenGestaltung.innenrahmen;
                    }

                }

                // =================================
                // PASSSTEMPEL POSITIONIEREN
                // =================================

                const pass = karte.querySelector(".pass-stempel");

                if (pass) {

                    pass.style.top = gestaltung.passOben || "auto";
                    pass.style.right = gestaltung.passRechts || "auto";

                    // Individuelle Passstempelgestaltung

                    if (passGestaltung.farbe) {
                        pass.style.color = passGestaltung.farbe;
                    }

                    if (passGestaltung.rahmen) {
                        pass.style.borderColor = passGestaltung.rahmen;
                    }

                    if (passGestaltung.winkel) {
                        pass.style.transform = "rotate(" + passGestaltung.winkel + ")";
                    }

                }

                // =================================
                // WASSERZEICHEN EINSTELLEN
                // =================================

if (wasserzeichen.bild) {

    const bildPfad = daten.einstellungen.basisPfad + wasserzeichen.bild;

    karte.style.setProperty(
        "--wasserzeichen-bild",
        "url('" + bildPfad + "')"
    );

}

                if (wasserzeichen.transparenz !== undefined) {
                    karte.style.setProperty(
                        "--wasserzeichen-transparenz",
                        wasserzeichen.transparenz
                    );
                }

                if (wasserzeichen.rechts) {
                    karte.style.setProperty(
                        "--wasserzeichen-rechts",
                        wasserzeichen.rechts
                    );
                }

                if (wasserzeichen.unten) {
                    karte.style.setProperty(
                        "--wasserzeichen-unten",
                        wasserzeichen.unten
                    );
                }

                if (wasserzeichen.breite) {
                    karte.style.setProperty(
                        "--wasserzeichen-breite",
                        wasserzeichen.breite
                    );
                }

                if (wasserzeichen.hoehe) {
                    karte.style.setProperty(
                        "--wasserzeichen-hoehe",
                        wasserzeichen.hoehe
                    );
                }

                // =================================
                // KARTE HINZUFÜGEN
                // =================================

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
            daten.reisen.length + " Reisekarten verarbeitet."
        );

    }

    // =========================================
    // STARTSEITE INITIALISIEREN
    // Erst nach dem Laden der JSON-Datei
    // =========================================

    window.reisedatenLaden
        .then(startseiteErstellen)
        .catch(fehler => {

            console.error(
                "Startseite konnte nicht erstellt werden:",
                fehler
            );

        });

})();
