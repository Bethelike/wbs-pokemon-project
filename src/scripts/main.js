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
