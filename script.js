// Funksjon for å håndtere søk, trigges både av klikk og Enter-tast
function handleSearch() {
  // Henter inn Pokémon-navnet fra inputfeltet, gjør det om til små bokstaver og fjerner mellomrom
  const name = document
    .getElementById("pokemonName")
    .value.toLowerCase()
    .trim();

  // Sjekker om inputen er tom, hvis ja: gi brukeren en advarsel og avslutt funksjonen
  if (!name) {
    alert("Skriv inn et Pokémon-navn, da!");
    return;
  }

  // Kaller funksjonen som henter og viser Pokémon-data
  fetchPokemonData(name);
}

// Funksjon som henter data fra PokéAPI og oppdaterer siden
async function fetchPokemonData(name) {
  try {
    // Gjør et API-kall til PokéAPI med det oppgitte navnet
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    // Sjekker om vi fikk en gyldig respons, hvis ikke: kast en feil
    if (!response.ok) throw new Error("Fant ikke Pokémonen, prøv igjen!");

    // Konverterer svaret fra API-et til et JavaScript-objekt
    const data = await response.json();

    // Oppdaterer HTML-elementene med informasjonen vi fikk fra API-et
    document.getElementById("pokemonTitle").textContent =
      data.name.toUpperCase(); // Pokémon-navn med store bokstaver
    document.getElementById("pokemonImage").src =
      data.sprites.other["official-artwork"].front_default; // Bildet av Pokémonen
    document.getElementById("pokemonHeight").textContent = data.height; // Høyde
    document.getElementById("pokemonWeight").textContent = data.weight; // Vekt
    document.getElementById("pokemonId").textContent = data.id; // ID

    // Fjerner eventuelle gamle stats i stats-seksjonen
    const statsElement = document.getElementById("pokemonStats");
    statsElement.innerHTML = "";

    // Løper gjennom stats-arrayen og lager et nytt <p>-element for hver stat
    data.stats.forEach((stat) => {
      const statItem = document.createElement("p");
      // Setter inn tekst som viser navn og verdi for hver stat
      statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
      // Legger til stat-elementet i stats-seksjonen
      statsElement.appendChild(statItem);
    });

    // Viser seksjonen med Pokémon-info
    document.getElementById("pokemonInfo").hidden = false;
  } catch (error) {
    // Viser en feilmelding hvis noe går galt
    alert(error.message);
  }
}

// Event listener for klikk på søk-knappen, kaller handleSearch-funksjonen
document.getElementById("searchButton").addEventListener("click", handleSearch);

// Event listener for Enter-tast i inputfeltet, kaller handleSearch-funksjonen
document.getElementById("pokemonName").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
