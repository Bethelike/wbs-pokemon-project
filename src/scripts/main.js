const cardsContainer = document.getElementById('cards-container');
const cardStyleClass = 'bg-gray-300 p-4 rounded-lg capitalize';

let allPokemon = [];
let allPokemonPath = 'https://pokeapi.co/api/v2/pokemon?limit=20';

async function fetchAllPokemon(path) {
  try {
    // while (path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Something went wrong');

    const data = await res.json();
    allPokemon = allPokemon.concat(data.results);
    path = data.next;
    console.log('Still fetching...');
    // }
    console.log(`Fetched ${allPokemon.length} Pokémon`);
    return allPokemon;
  } catch (err) {
    console.error(err);
  }
}

async function loadPokemon(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Something went wrong');
    const data = await res.json();
    console.log(data);
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

// Main function
fetchAllPokemon(allPokemonPath).then((results) => {
  console.log(results[0]);
  results.forEach((result) => {
    const pokemonIdPath = result.url;
    loadPokemon(pokemonIdPath).then((pokemon) => {
      console.log(pokemon);
      createCard(pokemon);
    });
  });
});

// GET pokemon by name endpoint
// endpoint https://pokeapi.co/api/v2/pokemon/ivysaur

// GET pokemon by id endpoint
// https://pokeapi.co/api/v2/pokemon/1
