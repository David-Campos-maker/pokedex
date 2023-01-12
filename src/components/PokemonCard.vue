<template>
    <div>
        <h1>Pokemon Card Component</h1>
        <div class="pokemon-card__container" v-for="pokemon in POKEMON_LIST" :key="pokemon">
            <div class="pokedex-row">
                <h3>{{ pokemon.name }}</h3>
                <p>#{{ pokemon.id }}</p>
                <p>{{ pokemon.height }}m</p>
                <p>{{ pokemon.weight }}Kg</p>
            </div>

            <img :src="pokemon.sprites.default" alt="default">

            <div class="pokedex-row pokedex-align-items-center" v-for="evolution in pokemon.evolutionChain" :key="evolution">
                <p>{{ evolution }}</p>
            </div>
            <div class="pokedex-row" v-for="stat in pokemon.pokemonStats" :key="stat">
                <p>{{ stat.stat }} {{ stat.baseStat }}</p>
            </div>
            <!-- <div class="pokedex-col pokedex-justify-space-between" v-for="ability in pokemon.abilities" :key="ability">
                <p>{{ ability.ability }}</p>
                <p>{{ ability.is_hidden }}</p>
            </div> -->
            <div class="pokedex-row" v-for="pokemon_type in pokemon.pokemonTypes" :key="pokemon_type">
                <h4>{{ pokemon_type.pokemonType }}</h4>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import  Pokemon from "../entities/Pokemon";
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
            const POKEMON_LIST: Array<Pokemon> = [];
    
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
                            let id = ("000" + res.data.id).slice(-3) ;
                            let name = res.data.name;
                            let height = res.data.height;
                            let weight = res.data.weight;
                            let sprites = getPokemonSprites(res.data.sprites) ; 
                            let abilities = getPokemonAbilities(res.data.abilities) ;
                            let pokemonTypes = getPokemonTypes(res.data.types) ;
                            let pokemonStats = getPokemonStats(res.data.stats) ;
                            let moves = getPokemonMoves(res.data.moves) ;
                            let evolutionChain = getEvolutionChain(res.data.species.url);

                            let pokemon = new Pokemon(abilities , evolutionChain , height , id , name , pokemonStats ,
                                pokemonTypes , moves , sprites , weight);
                            
                            console.log(pokemon.evolutionChain);

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