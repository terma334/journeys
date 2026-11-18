
(function () {

    // Zentrale Reisedaten einmalig laden

    window.reisedatenLaden = fetch(
        "https://terma334.github.io/journeys/reisedaten.json"
    )

        .then(response => {

            if (!response.ok) {
                throw new Error("reisedaten.json konnte nicht geladen werden.");
            }

            return response.json();

        })

        .then(daten => {

            // Gesamte Datenstruktur bereitstellen

            window.reisedaten = daten;

            // Kompatibilität für die bisherigen Skripte

            window.startseitenReisen = daten.reisen;

            console.log(
                "Reisedaten erfolgreich geladen:",
                daten.reisen.length,
                "Reisen"
            );

            return daten;

        })

        .catch(fehler => {

            console.error(
                "Fehler beim Laden der Reisedaten:",
                fehler
            );

            throw fehler;

        });

})();
