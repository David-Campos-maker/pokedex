<template>
    <div>
        <h1>Pokemon Card Component</h1>
        <div class="pokemon-card__container pokedex-row pokedex-justify-space-between pokedex-align-items-center" v-for="pokemon in POKEMON_LIST" :key="pokemon">
            <div class="pokedex-col pokedex-justify-space-between">
                <h3>{{ pokemon.name }}</h3>
                <p>#{{ pokemon.id }}</p>
                <p>{{ pokemon.height }}m</p>
                <p>{{ pokemon.weight }}Kg</p>
            </div>
            <img :src="pokemon.sprites.default" alt="default">
            <img :src="pokemon.sprites.shiny" alt="shiny">
            <div class="pokedex-col" v-for="stat in pokemon.pokemonStats" :key="stat">
                <p>{{ stat.stat }} {{ stat.baseStat }}</p>
            </div>
            <div class="pokedex-col pokedex-justify-space-between" v-for="ability in pokemon.abilities" :key="ability">
                <p>{{ ability.ability }}</p>
                <p>{{ ability.is_hidden }}</p>
            </div>
            <div class="pokedex-col" v-for="pokemon_type in pokemon.pokemonTypes" :key="pokemon_type">
                <h4>{{ pokemon_type.pokemonType }}</h4>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    import type IPokemon from "../Interfaces/IPokemon";
    import api from "../services/api";
    import getEvolutionChain from "../functions/getEvolutionChain";
    import getPokemonAbilities from "../functions/getPokemonAbilities";
    import getPokemonSprites from "../functions/getPokemonSprites";
    import getPokemonTypes from "../functions/getPokemonTypes";
    import getPokemonMoves from "../functions/getPokemonMoves";
    import getPokemonStats from "../functions/getPokemonStats";

    export default defineComponent({
        name: "pokemon-card" ,
        data() {  
            const POKEMON_LIST: Array<IPokemon> = [];
    
            return {
                POKEMON_LIST ,
            };
        },
        
        created() {
            this.getPokemons();
        },

        methods: {
            getPokemons() {
                api.get('pokemon?limit=151&offset=0').then((response) => {
                    response.data.results.forEach((element:any) => {
                        api.get(element.url).then((res) => {
                            let pokemon: IPokemon = {
                                id: ("000" + res.data.id).slice(-3) ,
                                name: res.data.name[0].toUpperCase() + res.data.name.substring(1) ,
                                height: (res.data.height / 10) ,
                                weight: (res.data.weight / 10),
                                sprites: getPokemonSprites(res.data.sprites) , 
                                abilities: getPokemonAbilities(res.data.abilities) ,
                                pokemonTypes: getPokemonTypes(res.data.types) ,
                                pokemonStats: getPokemonStats(res.data.stats)
                            };

                            this.POKEMON_LIST.push(pokemon);
                        });
                    });
                });
            },
        },
    });
</script>

<style scoped>
</style>