const cardsContainer = document.getElementById('cards-container');
const cardStyleClass = 'bg-gray-300 p-4 rounded-lg capitalize';
const main = document.querySelector('main');

let allPokemon = [];
let allPokemonPath = 'https://pokeapi.co/api/v2/pokemon';
let nextPage = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20';

async function fetchPokemon(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Something went wrong');

    const data = await res.json();
    const partialResults = data.results;
    // adds partial results to the general array
    allPokemon = allPokemon.concat(partialResults);
    path = data.next;
    console.log('Still fetching...');
    //returns partial results and the URL for the next page
    return { partialResults, next: data.next };
  } catch (err) {
    console.error(err);
  }
}

// calls the pokemon by it's path (id)
async function loadPokemon(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Something went wrong');
    const data = await res.json();

    // Extract the array of stats objects
    const stats = data.stats.map((s) => ({
      value: s.base_stat,
      name: s.stat.name,
      effort: s.effort,
    }));

    console.log(stats);

    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      stats,
    };
  } catch (err) {
    console.error(err);
  }
}

// create function that takes the pokemon fetch response as an argument
// use the data from the response to populate the card
// fill in the card with the required information
function createCard(pokemon) {
  const cardDiv = document.createElement('div');
  const cardTitle = document.createElement('h6');
  const image = document.createElement('img');
  const statsList = document.createElement('ul');
  const catchBtn = document.createElement('button');

  cardDiv.id = pokemon.id;
  cardDiv.classList = `${pokemon.name} flex flex-col items-center ${cardStyleClass}`;
  cardTitle.textContent = pokemon.name;
  image.src = pokemon.image;
  catchBtn.textContent = 'Catch it!';
  catchBtn.classList = 'mt-2 p-3 border-3 border-gray-100';

  cardsContainer.appendChild(cardDiv);
  cardDiv.appendChild(cardTitle);
  cardDiv.appendChild(image);
  cardDiv.appendChild(statsList);
  cardDiv.appendChild(catchBtn);

  pokemon.stats.forEach((stats) => {
    console.log(stats);
    const statsItem = document.createElement('li');
    statsItem.textContent = `${stats.name}: ${stats.value}`;
    statsList.appendChild(statsItem);
  });
}

function createLoadMoreBtn() {
  const loadMore = document.createElement('div');
  const loadMoreBtn = document.createElement('button');
  loadMore.classList = 'flex justify-center';
  loadMoreBtn.classList = 'load-more-items bg-gray-300 p-3 border-3 border-gray-100';
  loadMoreBtn.textContent = 'Load more';
  loadMore.appendChild(loadMoreBtn);
  main.appendChild(loadMore);
}

async function loadMorePokemon(nextPage) {
  const btn = document.querySelector('.load-more-items');
  btn.addEventListener('click', () => {
    fetchPokemon(nextPage).then(({ partialResults, next }) => {
      nextPage = next;
      partialResults.forEach((result) => {
        const pokemonIdPath = result.url;
        loadPokemon(pokemonIdPath).then((pokemon) => {
          createCard(pokemon);
        });
      });
    });
  });
}

// Main function
document.addEventListener('DOMContentLoaded', () => {
  fetchPokemon(allPokemonPath).then(({ partialResults }) => {
    console.log(partialResults);
    partialResults.forEach((result) => {
      const pokemonIdPath = result.url;
      loadPokemon(pokemonIdPath).then((pokemon) => {
        // console.log(pokemon);
        createCard(pokemon);
      });
    });
  });
  createLoadMoreBtn();
  loadMorePokemon(nextPage);
});

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
