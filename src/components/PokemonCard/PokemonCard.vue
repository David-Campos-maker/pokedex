<template>
    <div class="content pokedex__main-container">
        <div class="form-outline pokedexe__search-bar">
            <input v-model="input" type="search" class="form-control rounded pokedex__serach-pokemon" placeholder="Search for a Pokémon" aria-label="Search" aria-describedby="search-addon" />
        </div>

        <div class="pokemon-card__container" v-for="pokemon in filteredList()" :key="pokemon">
            <keep-alive>
                <info-card :pokemon="pokemon"></info-card>
            </keep-alive>
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
    import  Pokemon from "../../entities/Pokemon";
    import api from "../../services/api";
    import getPokemonAbilities from "../../functions/getPokemonAbilities";
    import getPokemonSprites from "../../functions/getPokemonSprites";
    import getPokemonTypes from "../../functions/getPokemonTypes";
    import getPokemonMoves from "../../functions/getPokemonMoves";
    import getPokemonStats from "../../functions/getPokemonStats";

    export default defineComponent({
    components: { InfoCard: defineAsyncComponent(() => import('../InfoCard/InfoCard.vue')) },

        data() {  
            const POKEMON_LIST: Array<Pokemon> = [];
            let input = ref("");
    
            return {
                POKEMON_LIST ,
                input
            };
        },
        
        created() {
            this.getPokemons();
        },

        methods: {
            getPokemons() {
                api.get('pokemon?limit=809&offset=0').then((response:any) => {
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
                            let evolutionChain = res.data.species.url;

                            let pokemon = new Pokemon(abilities , evolutionChain , height , id , name , pokemonStats ,
                                pokemonTypes , moves , sprites , weight);

                            this.POKEMON_LIST.push(pokemon);
                        });
                    });
                });
            },

            filteredList() {
                return this.POKEMON_LIST.filter((pokemon) =>
                    pokemon.name.toLowerCase().includes(this.input.toLowerCase())
                );
            },
        }
    });
</script>

<style scoped lang="scss">
    @import './styles.scss';
</style>