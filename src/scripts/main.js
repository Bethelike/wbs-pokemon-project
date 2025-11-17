const cardsContainer = document.getElementById('cards-container');
const cardStyleClass = 'bg-gray-300 p-4 rounded-lg capitalize';

let allPokemon = [];
let url = 'https://pokeapi.co/api/v2/pokemon?limit=20';

const path = 'https://pokeapi.co/api/v2/pokemon?limit=100';
// const next = 'https://pokeapi.co/api/v2/pokemon?offset=100&limit=100'

/* 
 To gets all 1328 pokemon

    async function fetchAllPokemon() {
    while (url) {
        const res = await fetch(url);
        const data = await res.json();

        allPokemon = allPokemon.concat(data.results);
        url = data.next;
        console.log('Still fetching...');
    }
    console.log(`Fetched ${allPokemon.length} Pokemon`);
    return allPokemon;
    }
    fetchAllPokemon();

*/

// get only x amount of pokemon
fetch(path)
  .then((res) => {
    if (!res.ok) throw new Error('Something went wrong');
    return res.json();
  })
  .then((data) => {
    const results = data.results;
    console.log('Raw data:', results);
    results.forEach((result) => {
      createCard(result);
    });
  })
  .catch(console.error);

// create function that takes the pokemon fetch response as an argument
// use the data from the response to populate the card
// fill in the card with the required information
function createCard(pokemon) {
  const cardDiv = document.createElement('div');
  cardDiv.textContent = pokemon.name;
  cardDiv.className = cardStyleClass;
  cardsContainer.appendChild(cardDiv);
}

// GET pokemon by name endpoint
// endpoint https://pokeapi.co/api/v2/pokemon/ivysaur

// GET pokemon by id endpoint
// https://pokeapi.co/api/v2/pokemon/1


// --- SEARCH BAR LOGIC ---

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!res.ok) throw new Error("Pokémon not found");

    const data = await res.json();

    // Clear the container before showing the searched Pokémon
    cardsContainer.innerHTML = "";

    console.log("Searched Pokémon:", data);

    // Create card from the actual Pokémon data (not just the name)
    const cardDiv = document.createElement('div');
    cardDiv.className = cardStyleClass;

    cardDiv.innerHTML = `
      <h2 class="font-semibold text-lg">${data.name}</h2>
      <img src="${data.sprites.front_default}" class="w-20 h-20"/>
      <p>Type: ${data.types[0].type.name}</p>
    `;

    cardsContainer.appendChild(cardDiv);

  } catch (error) {
    console.error(error);
    cardsContainer.innerHTML = `<p class="text-red-500 text-center mt-4">Pokémon not found</p>`;
  }

  searchInput.value = "";
});
