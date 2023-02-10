<template>
    <div class="content pokedex__main-container">
        <div class="form-outline pokedexe__search-bar">
            <input v-model="input" type="search" 
                    class="form-control rounded pokedex__serach-pokemon" 
                    placeholder="Search for a Pokémon" 
                    aria-label="Search" 
                    aria-describedby="search-addon" 
            />
        </div>

        <div class="pokemon-card__container" v-for="pokemon of pokedex" :key="pokemon.id">
            <info-card :pokemon="pokemon"></info-card>
        </div>

        <div class="pokedex__no-pokemon-found" v-if="input&&!filteredList().length">
            <p>No Pokémon found...</p>
            <div class="pokedex__error-code">
                4 <img class="pokedex__logo" src="../../assets/logo.png" alt="logo"> 4
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent  , ref , defineAsyncComponent} from "vue";
    // import LazyList from 'lazy-load-list/vue';
    import  Pokemon from "../../entities/Pokemon";
    import api from "../../services/api";
    import getMovesUrl from "../../functions/getMovesUrl";
    import getPokemonAbilities from "../../functions/getPokemonAbilities";
    import getPokemonSprites from "../../functions/getPokemonSprites";
    import getPokemonStats from "../../functions/getPokemonStats";
    import getPokemonTypes from "../../functions/getPokemonTypes";

    export default defineComponent({
        components: { InfoCard: defineAsyncComponent(() => import('../InfoCard/InfoCard.vue')) },

        data() {  
            const pokedex: Array<Pokemon> = [];
            let input = ref("");
    
            return {
                pokedex ,
                input
            };
        },
        
        async created() {
            this.createPokedex();
        },

        methods: {
            async createPokedex() {
                api.get('pokemon?limit=151&offset=0').then((response:any) => {
                    response.data.results.map((element:any) => {
                        api.get(element.url).then((res:any) => {
                            const id = ("000" + res.data.id).slice(-3) ;
                            const name = res.data.name;
                            const height = res.data.height;
                            const weight = res.data.weight;
                            const sprites = getPokemonSprites(res.data.sprites) ; 
                            const abilities = getPokemonAbilities(res.data.abilities) ;
                            const pokemonTypes = getPokemonTypes(res.data.types) ;
                            const pokemonStats = getPokemonStats(res.data.stats) ;
                            const moves = getMovesUrl(res.data.moves) ;
                            const evolutionChain = res.data.species.url;

                            const pokemon = new Pokemon(abilities , evolutionChain , height , id , name , pokemonStats ,
                                pokemonTypes , moves , sprites , weight);

                            this.pokedex.push(pokemon);
                        });
                    });
                });
            },

            filteredList() {
                return this.pokedex.filter((pokemon: { name: string; }) =>
                    pokemon.name.toLowerCase().includes(this.input.toLowerCase())
                );
            }
        },
    });
</script>

<style scoped lang="scss">
    @import './styles.scss';
</style>