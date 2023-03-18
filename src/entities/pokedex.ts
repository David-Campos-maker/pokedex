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

async function fetchPokedex(limit: number) {
  const response = await api.get(`pokemon?limit=${limit}&offset=0`);
  const pokedex: Array<Pokemon> = [];
  const promises: Promise<any>[] = [];

  for (const result of response.data.results) {
    promises.push(api.get(result.url));
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
  }

  pokedexState.pokedex = pokedex;
}

async function fetchPokemonByName(name: string) {
  try {
    const response = await api.get(`pokemon/${name}`);

    const pokemon = new Pokemon(
      getPokemonAbilities(response.data.abilities),
      response.data.species.url,
      response.data.height,
      ("000" + response.data.id).slice(-3),
      response.data.name,
      getPokemonStats(response.data.stats),
      getPokemonTypes(response.data.types),
      getMovesUrl(response.data.moves),
      getPokemonSprites(response.data.sprites),
      response.data.weight
    );
    
    return pokemon;
  } catch (error) {
    console.error(`Failed to fetch Pokemon "${name}":`, error);
    return null;
  }
}

export default {
  pokedexState,
  fetchPokedex,
  fetchPokemonByName,
};
