// ========================================
// LIGHTBOX, SLIDESHOW UND TV-ZOOM
// ========================================

let aktuellesBild = 0;

let zoomStufe = 1;
let zoomX = 0;
let zoomY = 0;

const zoomStufen = [1, 2, 4];

let lightboxElement;
let grossesBildElement;
let grossesVideoElement;
let beschreibungElement;
let videoOverlayElement;
let zoomStatusElement;


// ========================================
// ELEMENTE INITIALISIEREN
// ========================================

function lightboxElementeInitialisieren() {
    lightboxElement = document.getElementById("lightbox");
    grossesBildElement = document.getElementById("grossesBild");
    grossesVideoElement = document.getElementById("grossesVideo");
    beschreibungElement = document.getElementById("bildBeschreibung");
    videoOverlayElement = document.getElementById("videoOverlay");

    if (!lightboxElement || !grossesBildElement ||
        !grossesVideoElement || !beschreibungElement ||
        !videoOverlayElement) {
        return false;
    }

    if (!zoomStatusElement) {
        zoomStatusElement = document.createElement("div");
        zoomStatusElement.id = "zoomStatus";
        zoomStatusElement.setAttribute("aria-live", "polite");
        lightboxElement.appendChild(zoomStatusElement);
    }

    return true;
}


// ========================================
// ZOOM ZURÜCKSETZEN
// ========================================

function zoomZuruecksetzen() {
    zoomStufe = 1;
    zoomX = 0;
    zoomY = 0;

    if (grossesBildElement) {
        grossesBildElement.style.transform = "";
    }

    zoomStatusAktualisieren();
}


// ========================================
// ZOOMSTATUS ANZEIGEN
// ========================================

function zoomStatusAktualisieren() {
    if (!zoomStatusElement) return;

    if (zoomStufe === 1) {
        zoomStatusElement.textContent =
            "Gesamtansicht · OK: Zoom";
        zoomStatusElement.style.display = "block";
    } else {
        zoomStatusElement.textContent =
            zoomStufe + "× Zoom · Pfeile: Ausschnitt verschieben · OK: Zoom ändern";
        zoomStatusElement.style.display = "block";
    }
}


// ========================================
// BILDGRÖSSE UND ZOOM BEGRENZEN
// ========================================

function zoomGrenzenBerechnen() {
    if (!grossesBildElement || zoomStufe === 1) {
        return;
    }

    const bildBreite = grossesBildElement.clientWidth;
    const bildHoehe = grossesBildElement.clientHeight;

    const sichtBreite = lightboxElement.clientWidth;
    const sichtHoehe = lightboxElement.clientHeight;

    const maxX = Math.max(
        0,
        (bildBreite * zoomStufe - sichtBreite) / 2
    );

    const maxY = Math.max(
        0,
        (bildHoehe * zoomStufe - sichtHoehe) / 2
    );

    zoomX = Math.max(-maxX, Math.min(maxX, zoomX));
    zoomY = Math.max(-maxY, Math.min(maxY, zoomY));
}


// ========================================
// ZOOM ANWENDEN
// ========================================

function zoomAnwenden() {
    if (!grossesBildElement) return;

    zoomGrenzenBerechnen();

    grossesBildElement.style.transform =
        "translate(" + zoomX + "px, " + zoomY +
        "px) scale(" + zoomStufe + ")";

    zoomStatusAktualisieren();
}


// ========================================
// ZOOMSTUFE WECHSELN
// ========================================

function zoomWechseln() {
    const position = zoomStufen.indexOf(zoomStufe);
    const naechstePosition = (position + 1) % zoomStufen.length;

    zoomStufe = zoomStufen[naechstePosition];

    if (zoomStufe === 1) {
        zoomX = 0;
        zoomY = 0;
    }

    zoomAnwenden();
}


// ========================================
// BILDAUSSCHNITT VERSCHIEBEN
// ========================================

function bildAusschnittVerschieben(richtung) {
    if (zoomStufe === 1) return;

    const schritt = 60;

    if (richtung === "links") zoomX += schritt;
    if (richtung === "rechts") zoomX -= schritt;
    if (richtung === "oben") zoomY += schritt;
    if (richtung === "unten") zoomY -= schritt;

    zoomAnwenden();
}


// ========================================
// LIGHTBOX ÖFFNEN
// ========================================

function openLightbox(index) {
    if (!lightboxElementeInitialisieren()) return;

    if (index < 0 || index >= bilder.length) return;

    aktuellesBild = index;

    const eintrag = bilder[index];

    zoomZuruecksetzen();

    grossesBildElement.style.display = "none";
    grossesVideoElement.style.display = "none";
    videoOverlayElement.style.display = "none";

    grossesVideoElement.pause();
    grossesVideoElement.removeAttribute("src");
    grossesVideoElement.load();

    // TAGES-TRENNER
    if (eintrag.typ === "trenner") {
        if (eintrag.datei) {
            grossesBildElement.src = eintrag.datei;
            grossesBildElement.style.display = "block";
        }

        beschreibungElement.innerHTML =
            '<div class="tagesTrenner">' +
                '<div class="tagesTrennerTextBox">' +
                    '<div class="tagesTrennerTitel">' +
                        eintrag.titel +
                    '</div>' +
                    '<div class="tagesTrennerText">' +
                        eintrag.text +
                    '</div>' +
                    (eintrag.sterne
                        ? '<div class="tagesTrennerSterne">' +
                            eintrag.sterne +
                          '</div>'
                        : '') +
                '</div>' +
            '</div>';
    }

    // VIDEO
    else if (eintrag.typ === "video") {
        grossesVideoElement.src = eintrag.datei;
        grossesVideoElement.style.display = "block";
        grossesVideoElement.load();

        videoOverlayElement.style.display = "flex";
        beschreibungElement.textContent = eintrag.text || "";
    }

    // NORMALES BILD
    else {
        grossesBildElement.src = eintrag.datei;
        grossesBildElement.style.display = "block";

        beschreibungElement.textContent = eintrag.text || "";
    }

    lightboxElement.style.display = "flex";
    zoomStatusAktualisieren();
}


// ========================================
// LIGHTBOX SCHLIESSEN
// ========================================

function closeLightbox() {
    if (!lightboxElementeInitialisieren()) return;

    grossesVideoElement.pause();
    grossesVideoElement.removeAttribute("src");
    grossesVideoElement.load();

    lightboxElement.style.display = "none";
    videoOverlayElement.style.display = "none";

    zoomZuruecksetzen();
}


// ========================================
// VOR UND ZURÜCK
// ========================================

function nextImage() {
    if (aktuellesBild >= bilder.length - 1) {
        closeLightbox();
        return;
    }

    openLightbox(aktuellesBild + 1);
}

function prevImage() {
    if (aktuellesBild <= 0) return;

    openLightbox(aktuellesBild - 1);
}


// ========================================
// HINTERGRUNDKLICK
// ========================================

document.getElementById("lightbox").addEventListener(
    "click",
    function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    }
);


// ========================================
// FERNBEDIENUNG UND TASTATUR
// ========================================

document.addEventListener("keydown", function(e) {
    if (!lightboxElement) {
        lightboxElement = document.getElementById("lightbox");
    }

    if (!lightboxElement ||
        lightboxElement.style.display !== "flex") {
        return;
    }

    const taste = e.key;

    // Zoom: OK / Enter / Leertaste
    if (taste === "Enter" || taste === " ") {
        e.preventDefault();
        zoomWechseln();
        return;
    }

    // Schließen: Escape / Backspace
    if (taste === "Escape" || taste === "Backspace") {
        e.preventDefault();
        closeLightbox();
        return;
    }

    // Bei Zoom verschieben die Pfeile das Foto.
    if (zoomStufe > 1) {
        if (taste === "ArrowLeft") {
            e.preventDefault();
            bildAusschnittVerschieben("links");
        }

        if (taste === "ArrowRight") {
            e.preventDefault();
            bildAusschnittVerschieben("rechts");
        }

        if (taste === "ArrowUp") {
            e.preventDefault();
            bildAusschnittVerschieben("oben");
        }

        if (taste === "ArrowDown") {
            e.preventDefault();
            bildAusschnittVerschieben("unten");
        }

        return;
    }

    // In der Gesamtansicht blättern.
    if (taste === "ArrowRight") {
        e.preventDefault();
        nextImage();
    }

    if (taste === "ArrowLeft") {
        e.preventDefault();
        prevImage();
    }
});


// ========================================
// VIDEO STARTEN
// ========================================

function videoStarten() {
    const video = document.getElementById("grossesVideo");

    video.play();
    document.getElementById("videoOverlay").style.display = "none";
}


// ========================================
// MENÜ
// ========================================

function toggleMenu() {
    document.getElementById("nav").classList.toggle("offen");
}


// ========================================
// WISCHGESTEN AUF DEM SMARTPHONE
// ========================================

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const lightbox = document.getElementById("lightbox");

lightbox.addEventListener("touchstart", function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

lightbox.addEventListener("touchend", function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;

    const differenzX = touchEndX - touchStartX;
    const differenzY = touchEndY - touchStartY;

    if (Math.abs(differenzX) < 100) return;
    if (Math.abs(differenzX) <= Math.abs(differenzY)) return;

    // Im Zoomzustand nicht versehentlich zum nächsten Bild wechseln.
    if (zoomStufe > 1) return;

    if (differenzX < 0) {
        nextImage();
    } else {
        prevImage();
    }
}, { passive: true });


// ========================================
// FENSTERGRÖSSE
// ========================================

window.addEventListener("resize", function() {
    if (zoomStufe > 1) {
        zoomAnwenden();
    }
});

// ========================================
// ZOOM DURCH MAUSKLICK AUF DAS FOTO
// ========================================

document.getElementById("grossesBild").addEventListener("click", function(e) {

    // Verhindert, dass der Klick die Lightbox schließt
    e.stopPropagation();

    // Zoomstufe wechseln
    zoomWechseln();

});