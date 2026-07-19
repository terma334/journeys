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

        // Beschriftung nur erzeugen, wenn vorhanden
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

        // Container
        const container = document.createElement("div");
        container.className = "videoVorschau";

        // Video
        const video = document.createElement("video");
        video.src = datei;
        video.preload = "metadata";
        video.muted = true;
        video.loading = "lazy";

        container.onclick = () => openLightbox(bildIndex);

        // Playbutton
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


// -------------------------
// HIER DIE BESCHREIBUNGEN
// -------------------------

galerieErstellen("galerie1", "pictures/Tag1", 18);

galerieErstellen("galerie2a", "pictures/Tag2/a", 10);
galerieErstellen("galerie2b", "pictures/Tag2/b", 10);
galerieErstellen("galerie2c", "pictures/Tag2/c", 7);
galerieErstellen("galerie2d", "pictures/Tag2/d", 8);

galerieErstellen("galerie3a", "pictures/Tag3/a", 31);
galerieErstellen("galerie3b", "pictures/Tag3/b", 25);

galerieErstellen("galerie4a", "pictures/Tag4/a", 11);
galerieErstellen("galerie4b", "pictures/Tag4/b", 10);
videoGalerieErstellen("galerie4d", "pictures/Tag4/b", 1);
galerieErstellen("galerie4c", "pictures/Tag4/c", 10);

galerieErstellen("galerie5a", "pictures/Tag5/a", 24);
galerieErstellen("galerie5b", "pictures/Tag5/b", 9);

galerieErstellen("galerie6a", "pictures/Tag6/a", 5);
videoGalerieErstellen("galerie6c", "pictures/Tag6/a", 3);
galerieErstellen("galerie6b", "pictures/Tag6/b", 12);

galerieErstellen("galerie7a", "pictures/Tag7/a", 9);
galerieErstellen("galerie7b", "pictures/Tag7/b", 21);

galerieErstellen("galerie8a", "pictures/Tag8/a", 15);
galerieErstellen("galerie8b", "pictures/Tag8/b", 17);
galerieErstellen("galerie8c", "pictures/Tag8/c", 17);

galerieErstellen("galerie9", "pictures/Tag9", 10);

galerieErstellen("galerie10a", "pictures/Tag10/a", 6);
videoGalerieErstellen("galerie10b", "pictures/Tag10/a", 6);
galerieErstellen("galerie10c", "pictures/Tag10/c", 7);

galerieErstellen("galerie11", "pictures/Tag11", 14);

galerieErstellen("galerie12", "pictures/Tag12", 2);

galerieErstellen("galerie13", "pictures/Tag13", 33);

galerieErstellen("galerie14", "pictures/Tag14", 8);

galerieErstellen("galerie15", "pictures/Tag15", 9);


// weitere Galerien einfach genauso ergänzen...

let aktuellesBild = 0;

function openLightbox(index){

    aktuellesBild = index;

    const eintrag = bilder[index];

    const img = document.getElementById("grossesBild");
    const video = document.getElementById("grossesVideo");
    const text = document.getElementById("bildBeschreibung");

    // Erst alles ausblenden
    img.style.display = "none";
    video.style.display = "none";

    // Falls gerade ein Video läuft, stoppen
    video.pause();
    video.removeAttribute("src");
    video.load();

    if(eintrag.typ === "video"){

        video.src = eintrag.datei;
        video.style.display = "block";
        video.load();
        document.getElementById("videoOverlay").style.display = "flex";

    }else{

        img.src = eintrag.datei;
        img.style.display = "block";
        document.getElementById("videoOverlay").style.display = "none";

    }

    text.textContent = eintrag.text || "";

    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox(){

    const video = document.getElementById("grossesVideo");

    video.pause();
    video.removeAttribute("src");
    video.load();

    document.getElementById("lightbox").style.display = "none";
    document.getElementById("videoOverlay").style.display = "none";

}

function nextImage(){

    aktuellesBild++;

    if(aktuellesBild >= bilder.length){
        aktuellesBild = 0;
    }

    openLightbox(aktuellesBild);

}

function prevImage(){

    aktuellesBild--;

    if(aktuellesBild < 0){
        aktuellesBild = bilder.length - 1;
    }

    openLightbox(aktuellesBild);

}

document.getElementById("lightbox").addEventListener("click", function(e){

    if(e.target === this){
        closeLightbox();
    }

});

document.addEventListener("keydown",function(e){

    if(document.getElementById("lightbox").style.display!="flex")
        return;

    if(e.key==="ArrowRight")
        nextImage();

    if(e.key==="ArrowLeft")
        prevImage();

    if(e.key==="Escape")
        closeLightbox();

});

document.getElementById("lightbox").addEventListener("click",function(e){

    if(e.target.id==="lightbox")
        closeLightbox();

});
function videoStarten(){

    const video = document.getElementById("grossesVideo");

    video.play();

    document.getElementById("videoOverlay").style.display = "none";

}