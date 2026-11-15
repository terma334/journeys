// ========================================
// GALERIE-FUNKTIONEN
// ========================================

const bilder = [];


function galerieErstellen(id, ordner, anzahl, texte = []) {
    const galerie = document.getElementById(id);

    for (let index = 0; index < anzahl; index++) {
        const datei = `${ordner}/${index + 1}.jpg`;
        const text = texte[index] || "";

        bilder.push({
            typ: "bild",
            datei: datei,
            text: text
        });

        const bildIndex = bilder.length - 1;
        const figure = document.createElement("figure");
        const img = document.createElement("img");

        img.src = datei;
        img.loading = "lazy";
        img.onclick = () => openLightbox(bildIndex);

        figure.appendChild(img);

        if (text !== "") {
            const caption = document.createElement("figcaption");
            caption.textContent = text;
            figure.appendChild(caption);
        }

        galerie.appendChild(figure);
    }
}


function videoGalerieErstellen(id, ordner, anzahl, texte = []) {
    const galerie = document.getElementById(id);

    for (let index = 0; index < anzahl; index++) {
        const datei = `${ordner}/${index + 1}.mp4`;
        const text = texte[index] || "";

        bilder.push({
            typ: "video",
            datei: datei,
            text: text
        });

        const bildIndex = bilder.length - 1;
        const figure = document.createElement("figure");
        const container = document.createElement("div");

        container.className = "videoVorschau";

        const video = document.createElement("video");
        video.src = datei;
        video.preload = "metadata";
        video.muted = true;

        container.onclick = () => openLightbox(bildIndex);

        const play = document.createElement("div");
        play.className = "playButton";
        play.innerHTML = "▶";

        container.appendChild(video);
        container.appendChild(play);
        figure.appendChild(container);

        if (text !== "") {
            const caption = document.createElement("figcaption");
            caption.textContent = text;
            figure.appendChild(caption);
        }

        galerie.appendChild(figure);
    }
}


function tagesTrenner(titel, untertitel, sterne = "", bild = "") {
    bilder.push({
        typ: "trenner",
        titel: titel,
        text: untertitel,
        sterne: sterne,
        datei: bild
    });
}