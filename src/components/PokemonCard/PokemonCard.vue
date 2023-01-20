<template>
    <div>
        <div class="pokemon-card__container" v-for="pokemon in POKEMON_LIST" :key="pokemon">
            <info-card :pokemon="pokemon"></info-card>
            <stats-card :pokemon="pokemon"></stats-card>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import  Pokemon from "../../entities/Pokemon";
    import api from "../../services/api";
    import getEvolutionChain from "../../functions/getEvolutionChain";
    import getPokemonAbilities from "../../functions/getPokemonAbilities";
    import getPokemonSprites from "../../functions/getPokemonSprites";
    import getPokemonTypes from "../../functions/getPokemonTypes";
    import getPokemonMoves from "../../functions/getPokemonMoves";
    import getPokemonStats from "../../functions/getPokemonStats";
    import InfoCard from "../InfoCard/InfoCard.vue";
    import StatsCard from "../StatsCard/StatsCard.vue";

    export default defineComponent({
    components: { InfoCard , StatsCard},

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
                api.get('pokemon?limit=151&offset=0').then((response:any) => {
                    response.data.results.forEach((element:any) => {
                        api.get(element.url).then((res:any) => {
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

<style scoped lang="scss">
@import './styles.scss';
</style>