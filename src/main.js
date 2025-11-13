const cardsContainer = document.getElementById('cards-container');
const cardStyleClass = 'bg-gray-300 p-4 rounded-lg capitalize';

let allPokemon = [];
let url = 'https://pokeapi.co/api/v2/pokemon?limit=20';

const path = 'https://pokeapi.co/api/v2/pokemon?limit=100';
// const next = 'https://pokeapi.co/api/v2/pokemon?offset=100&limit=100'

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

fetchAllPokemon(url).then((results) => {
  console.log(results[0]);
  results.forEach((result) => {
    loadPokemon(result.url).then((pokemon) => {
      console.log(pokemon);
      createCard(pokemon);
    });
  });
});

// create function that takes the pokemon fetch response as an argument
// use the data from the response to populate the card
// fill in the card with the required information
function createCard(pokemon) {
  const cardDiv = document.createElement('div');
  const cardTitle = document.createElement('h6');
  const image = document.createElement('img');
  cardDiv.textContent = pokemon.name;
  cardDiv.className = cardStyleClass;

  cardsContainer.appendChild(cardDiv);
  cardDiv.appendChild(cardTitle);
  cardDiv.appendChild(image);
}

// GET pokemon by name endpoint
// endpoint https://pokeapi.co/api/v2/pokemon/ivysaur

// GET pokemon by id endpoint
// https://pokeapi.co/api/v2/pokemon/1

/*

const cardsContainer = document.getElementById('pokemon-container');
const cardStyleClass = 'bg-gray-300 p-4 rounded-lg capitalize';

let allPokemon = [];
// let url = 'https://pokeapi.co/api/v2/pokemon?limit=20';

const path = 'https://pokeapi.co/api/v2/pokemon?limit=150';
// const next = 'https://pokeapi.co/api/v2/pokemon?offset=100&limit=100'

const pokemonByNamePath = '';
const pokemonByIdPath = 'https://pokeapi.co/api/v2/pokemon/1/';

// get only x amount of pokemon
fetch(path)
  .then((res) => {
    if (!res.ok) throw new Error('Something went wrong');
    return res.json();
  })
  .then((data) => {
    const results = data.results;
    results.forEach((result) => {
      loadPokemon(result.url).then((pokemon) => {
        console.log(pokemon);
        createCard(pokemon);
      });
    });
  })
  .catch(console.error);

// create function that takes the pokemon fetch response as an argument
// use the data from the response to populate the card
// fill in the card with the required information
function createCard(pokemon) {
  const cardDiv = document.createElement('div');
  const cardHeader = document.createElement('h6');
  const img = document.createElement('img');
  const span = document.createElement('span');

  cardHeader.textContent = pokemon.name;
  cardDiv.className = cardStyleClass;
  img.src = pokemon.sprites.other['official-artwork'].front_default;
  span.textContent = `Type: ${pokemon.types[0].type.name}`;
  // console.log(span.textContent);
  cardDiv.appendChild(cardHeader);
  cardDiv.appendChild(img);
  cardDiv.appendChild(span);
  cardsContainer.appendChild(cardDiv);
}




*/
