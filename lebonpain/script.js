// Données simulées de profils (mock)
const profils = [
    { pseudo: "Luna", age: 24, ville: "Toulouse", intention: "sérieux" },
    { pseudo: "Max", age: 28, ville: "Paris", intention: "sorties" },
    { pseudo: "Nora", age: 22, ville: "Lyon", intention: "amitié" },
    { pseudo: "Eli", age: 30, ville: "Toulouse", intention: "sérieux" },
    { pseudo: "Jay", age: 26, ville: "Marseille", intention: "sorties" }
];

const profileForm = document.getElementById("profileForm");
const profileStatus = document.getElementById("profileStatus");
const profilesList = document.getElementById("profilesList");

const filterVille = document.getElementById("filterVille");
const filterIntention = document.getElementById("filterIntention");
const btnFilter = document.getElementById("btnFilter");

const btnMatch = document.getElementById("btnMatch");
const matchResult = document.getElementById("matchResult");

// Profil utilisateur (stocké en mémoire simple)
let monProfil = null;

// Affichage initial des profils
renderProfiles(profils);

// Gestion création de profil
profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const pseudo = document.getElementById("pseudo").value.trim();
    const age = parseInt(document.getElementById("age").value, 10);
    const ville = document.getElementById("ville").value.trim();
    const intention = document.getElementById("intention").value;

    if (!pseudo || !age || !ville || !intention) {
        profileStatus.textContent = "Merci de remplir tous les champs.";
        profileStatus.style.color = "#f97316";
        return;
    }

    monProfil = { pseudo, age, ville, intention };
    profileStatus.textContent = `Profil enregistré : ${pseudo}, ${age} ans, ${ville} (${intention}).`;
    profileStatus.style.color = "#22c55e";
});

// Filtrage des profils
btnFilter.addEventListener("click", () => {
    const ville = filterVille.value.trim().toLowerCase();
    const intention = filterIntention.value;

    const filtrés = profils.filter(p => {
        const okVille = ville ? p.ville.toLowerCase().includes(ville) : true;
        const okIntention = intention ? p.intention === intention : true;
        return okVille && okIntention;
    });

    renderProfiles(filtrés);
});

// Match rapide
btnMatch.addEventListener("click", () => {
    if (!monProfil) {
        matchResult.textContent = "Crée d’abord ton profil pour trouver un bon pin 😉";
        return;
    }

    const compatibles = profils.filter(p => p.intention === monProfil.intention && p.ville === monProfil.ville);

    if (compatibles.length === 0) {
        matchResult.textContent = "Pas de match parfait pour l’instant… mais reste connecté, ça arrive vite.";
        return;
    }

    const choisi = compatibles[Math.floor(Math.random() * compatibles.length)];
    matchResult.innerHTML = `
        <strong>Match trouvé :</strong> ${choisi.pseudo}, ${choisi.age} ans, ${choisi.ville} (${choisi.intention})
    `;
});

// Fonction d’affichage des profils
function renderProfiles(list) {
    profilesList.innerHTML = "";

    if (list.length === 0) {
        profilesList.innerHTML = "<p>Aucun profil ne correspond à ces critères.</p>";
        return;
    }

    list.forEach(p => {
        const div = document.createElement("div");
        div.className = "profile-card";
        div.innerHTML = `
            <h3>${p.pseudo}</h3>
            <p class="profile-meta">${p.age} ans — ${p.ville}</p>
            <p class="profile-meta">Intention : ${p.intention}</p>
        `;
        profilesList.appendChild(div);
    });
}
