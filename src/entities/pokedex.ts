/**
 * In this file the pokemon list is created as a global and reactive object
*/

import api from '../services/api';
import { reactive } from 'vue';
import Pokemon from './Pokemon';
import getPokemonAbilities from '../functions/getPokemonAbilities';
import getPokemonStats from '../functions/getPokemonStats';
import getPokemonTypes from '../functions/getPokemonTypes';
import getMovesUrl from '../functions/getMovesUrl';
import getPokemonSprites from '../functions/getPokemonSprites';

interface PokedexState {
  pokedex: Array<Pokemon>;
}

const pokedexState = reactive<PokedexState>({
  pokedex: [],
});

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000;

function isCacheExpired(timestamp: number) {
  return Date.now() - timestamp > CACHE_EXPIRATION_TIME;
}

async function fetchPokedex(limit: number) {
  const response = await api.get(`pokemon?limit=${limit}&offset=0`);
  const pokedex: Array<Pokemon> = [];
  const promises: Promise<any>[] = [];

  for (const result of response.data.results) {
    const cachedPokemon = localStorage.getItem(result.name);

    if (cachedPokemon) {
      const cachedData = JSON.parse(cachedPokemon);
      if (isCacheExpired(cachedData.timestamp)) {
        localStorage.removeItem(result.name);
        promises.push(api.get(result.url));
      } 
      
      else {
        pokedex.push(cachedData.pokemon);
      }
    } 
    
    else {
      promises.push(api.get(result.url));
    }
  }

  const responses = await Promise.all(promises);

  for (const res of responses) {
    const pokemon = new Pokemon(
      getPokemonAbilities(res.data.abilities),
      res.data.species.url,
      res.data.height,
      ("000" + res.data.id).slice(-3),
      res.data.name,
      getPokemonStats(res.data.stats),
      getPokemonTypes(res.data.types),
      getMovesUrl(res.data.moves),
      getPokemonSprites(res.data.sprites),
      res.data.weight
    );

    pokedex.push(pokemon);

    localStorage.setItem(res.data.name, JSON.stringify({
      pokemon,
      timestamp: Date.now()
    }));
  }

  pokedexState.pokedex = pokedex;
}

async function fetchPokemonByName(name: string): Promise<Array<any> | null> {
  try {
    const baseName = name.split('-')[0];

    const response = await api.get(`pokemon-species/${baseName}`);
    const species = response.data.varieties;

    const pokemons = await Promise.all(
      species.map(async (variety: { pokemon: { name: string; url: string; }; }) => {
        const varietyName = variety.pokemon.name;
        const cachedPokemon = localStorage.getItem(varietyName);

        if (cachedPokemon) {
          const cachedData = JSON.parse(cachedPokemon);
          if (isCacheExpired(cachedData.timestamp)) {
            localStorage.removeItem(varietyName);
          } 
          
          else {
            return cachedData.pokemon;
          }
        }

        try {
          const pokemonResponse = await api.get(variety.pokemon.url);
          
          if (pokemonResponse && pokemonResponse.data) {
            const pokemon = new Pokemon(
              getPokemonAbilities(pokemonResponse.data.abilities),
              pokemonResponse.data.species.url,
              pokemonResponse.data.height,
              ("000" + pokemonResponse.data.id).slice(-3),
              pokemonResponse.data.name,
              getPokemonStats(pokemonResponse.data.stats),
              getPokemonTypes(pokemonResponse.data.types),
              getMovesUrl(pokemonResponse.data.moves),
              getPokemonSprites(pokemonResponse.data.sprites),
              pokemonResponse.data.weight
            );

            localStorage.setItem(varietyName, JSON.stringify({
              pokemon,
              timestamp: Date.now()
            }));

            return pokemon;
          } 
          
          else {
            return null;
          }
        } 
        
        catch (error) {
          console.error(`Failed to fetch Pokemon form "${variety.pokemon.url}":`, error);
          return null;
        }
      })
    );

    return pokemons;
  } 
  
  catch (error) {
    console.error(`Failed to fetch Pokemon "${name}":`, error);
    return null;
  }
}

export default {
  pokedexState,
  fetchPokedex,
  fetchPokemonByName,
};
