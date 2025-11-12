let allPokemon = [];
let url = 'https://pokeapi.co/api/v2/pokemon?limit=20';

const path = 'https://pokeapi.co/api/v2/pokemon?limit=100';
// const next = 'https://pokeapi.co/api/v2/pokemon?offset=100&limit=100'

// gets all 1328 pokemon

// async function fetchAllPokemon() {
//   while (url) {
//     const res = await fetch(url);
//     const data = await res.json();

//     allPokemon = allPokemon.concat(data.results);
//     url = data.next;
//     console.log('Still fetching...');
//   }
//   console.log(`Fetched ${allPokemon.length} Pokemon`);
//   return allPokemon;
// }

// fetchAllPokemon();

// get only x amount of pokemon
fetch(path)
  .then((res) => {
    if (!res.ok) throw new Error('Something went wrong');
    return res.json();
  })
  .then((data) => {
    console.log('Raw data:', data);
  })
  .catch(console.error);

// GET pokemon by name endpoint
// endpoint https://pokeapi.co/api/v2/pokemon/ivysaur

// GET pokemon by id endpoint
// https://pokeapi.co/api/v2/pokemon/1
