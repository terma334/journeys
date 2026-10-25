// ========================================
// LIGHTBOX UND SLIDESHOW
// ========================================

let aktuellesBild = 0;


function openLightbox(index) {
    aktuellesBild = index;

    const eintrag = bilder[index];

    const img = document.getElementById("grossesBild");
    const video = document.getElementById("grossesVideo");
    const text = document.getElementById("bildBeschreibung");
    const overlay = document.getElementById("videoOverlay");

    // Alles ausblenden
    img.style.display = "none";
    video.style.display = "none";
    overlay.style.display = "none";

    // Laufendes Video stoppen
    video.pause();
    video.removeAttribute("src");
    video.load();

    // TAGES-TRENNER
    if (eintrag.typ === "trenner") {
        if (eintrag.datei) {
            img.src = eintrag.datei;
            img.style.display = "block";
        }

        text.innerHTML =
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
        video.src = eintrag.datei;
        video.style.display = "block";
        video.load();

        overlay.style.display = "flex";
        text.textContent = eintrag.text || "";
    }

    // NORMALES BILD
    else {
        img.src = eintrag.datei;
        img.style.display = "block";

        text.textContent = eintrag.text || "";
    }

    document.getElementById("lightbox").style.display = "flex";
}


// ========================================
// LIGHTBOX SCHLIESSEN
// ========================================

function closeLightbox() {
    const video = document.getElementById("grossesVideo");

    video.pause();
    video.removeAttribute("src");
    video.load();

    document.getElementById("lightbox").style.display = "none";
    document.getElementById("videoOverlay").style.display = "none";
}


// ========================================
// VOR UND ZURÜCK
// ========================================

function nextImage() {
    // Am Ende schließen
    if (aktuellesBild >= bilder.length - 1) {
        closeLightbox();
        return;
    }

    aktuellesBild++;
    openLightbox(aktuellesBild);
}


function prevImage() {
    // Am Anfang nicht zum letzten Eintrag springen
    if (aktuellesBild <= 0) {
        return;
    }

    aktuellesBild--;
    openLightbox(aktuellesBild);
}


// ========================================
// KLICK AUF DEN HINTERGRUND
// ========================================

document.getElementById("lightbox").addEventListener("click", function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});


// ========================================
// TASTATURSTEUERUNG
// ========================================

document.addEventListener("keydown", function(e) {
    if (document.getElementById("lightbox").style.display !== "flex") {
        return;
    }

    if (e.key === "ArrowRight") {
        nextImage();
    }

    if (e.key === "ArrowLeft") {
        prevImage();
    }

    if (e.key === "Escape") {
        closeLightbox();
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

    const minWischstrecke = 100;

    // Zu kurze Bewegung ignorieren
    if (Math.abs(differenzX) < minWischstrecke) {
        return;
    }

    // Nur überwiegend horizontale Bewegungen zählen
    if (Math.abs(differenzX) <= Math.abs(differenzY)) {
        return;
    }

    // Nach links: nächster Eintrag
    if (differenzX < 0) {
        nextImage();
    }

    // Nach rechts: vorheriger Eintrag
    else {
        prevImage();
    }
}, { passive: true });

