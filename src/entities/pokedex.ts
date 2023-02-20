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

async function fetchPokedex() {
  const response = await api.get('pokemon?limit=807&offset=0');
  const pokedex: Array<Pokemon> = [];

  for (const result of response.data.results) {
    const res = await api.get(result.url);

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

export default {
  pokedexState,
  fetchPokedex,
};
