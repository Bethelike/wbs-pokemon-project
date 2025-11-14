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
    return data;
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
  const span = document.createElement('span');
  const catchBtn = document.createElement('button');

  cardDiv.id = pokemon.id;
  cardDiv.classList = `${pokemon.name} flex flex-col items-center ${cardStyleClass}`;
  cardTitle.textContent = pokemon.name;
  image.src = pokemon.sprites.other['official-artwork'].front_default;
  span.textContent = `Stats: ${pokemon.stats[0].base_stat} ...`;
  catchBtn.textContent = 'Catch it!';
  catchBtn.classList = 'mt-2 p-3 border-3 border-gray-100';

  cardsContainer.appendChild(cardDiv);
  cardDiv.appendChild(cardTitle);
  cardDiv.appendChild(image);
  cardDiv.appendChild(span);
  cardDiv.appendChild(catchBtn);
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
