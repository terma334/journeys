
const reisen = [
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
        passOben: "20px",
        passRechts: "225px",
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
        stempelLinks: "auto",
        stempelRechts: "10px",
        passOben: "15px",
        passRechts: "35px",
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
        passOben: "25px",
        passRechts: "155px",
    },
    

];

function startseiteErstellen() {
    const container = document.getElementById("reise-karten");
    if (!container) return;

    container.innerHTML = "";

    reisen.forEach(reise => {
        const karte = document.createElement("a");
        karte.href = reise.link;
        karte.className = "startseiten-karte " + reise.stempelTyp;
        karte.style.setProperty("--karten-winkel", reise.winkel);

        karte.innerHTML = `
            <div class="karten-bild">

                <img src="${reise.bild}"
                     alt="${reise.name}"
                     loading="lazy">

                <div class="briefmarke briefmarke-${reise.stempelTyp}">
                    <div class="marken-inhalt">
                        <img src="${reise.flagge}" alt="Flagge">
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

        const marke = karte.querySelector(".briefmarke");
        const pass = karte.querySelector(".pass-stempel");
        const post = karte.querySelector(".stempel-post");

        marke.style.top = reise.stempelOben;
        marke.style.left = reise.stempelLinks || "auto";
        marke.style.right = reise.stempelRechts || "auto";

        pass.style.top = reise.passOben;
        pass.style.right = reise.passRechts;


        container.appendChild(karte);
    });
}

document.addEventListener("DOMContentLoaded", startseiteErstellen);
