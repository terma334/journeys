document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("reise-karten");

    if (container) {
        container.innerHTML = `
            <div style="background:red;color:white;padding:30px;font-size:24px;">
                JAVASCRIPT FUNKTIONIERT!
            </div>
        `;
    } else {
        alert("Kartencontainer nicht gefunden!");
    }
});