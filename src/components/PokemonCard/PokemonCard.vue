<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-center">
            <div class="pokedex__main-container mx-auto">
                <div class="form-outline pokedex__search-bar__container">
                    <input
                        v-model.lazy="input"
                        type="search"
                        class="form-control rounded pokedex__search-bar"
                        placeholder="Search for a Pokémon"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        @keyup.enter="searchPokemon()"
                    />
                    <button @click="searchPokemon()" class="pokedex__search-button">
                        <span class="material-symbols-rounded pokedex__search-icon">
                            search
                        </span>
                    </button>
                </div>
                
                <div>
            
                    <div class="pokemon-card__container" v-if="!input">
                            <info-card
                                v-for="pokemon in pokemonList"
                                :key="pokemon.id"
                                :pokemon="pokemon"
                            ></info-card>
                    </div>

                    <div class="pokemon-card__container" v-else-if="foundPokemon">
                        <info-card 
                            v-for="foundForm in foundPokemon"
                            :key="foundForm.id"
                            :pokemon="foundForm"
                        ></info-card>
                    </div>
            
                    <div class="pokedex__no-pokemon-found" v-if="input && !foundPokemon">
                        <p>No Pokémon found...</p>
                        <div class="pokedex__error-code">
                            4<img class="pokedex__logo" src="../../assets/logo.png" alt="logo" />4
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import pokedex from '../../entities/pokedex';
    import Pokemon from '../../entities/Pokemon';
    import { defineComponent, defineAsyncComponent , ref} from 'vue';

    export default defineComponent({
        components: {
            InfoCard: defineAsyncComponent(() => import('../InfoCard/InfoCard.vue')),
        },

        setup() {
            const input = ref('');
            const limit = ref(60);
            const foundPokemon = ref<any[] | null>(null);
            const handleScrollEnabled = ref(true);

            return {
                input,
                limit,
                foundPokemon,
                handleScrollEnabled,
            }
        },

        created() {
            pokedex.fetchPokedex(this.limit);
            window.addEventListener('scroll', this.handleScroll);
            window.addEventListener('touchmove', this.handleScroll);
        },

        beforeUnmount() {
            window.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener('touchmove', this.handleScroll);
        },

        methods: {
            async handleScroll() {
                if (!this.handleScrollEnabled) return;

                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = window.innerHeight;
                const scrollTop = window.pageYOffset;
                const diff = scrollHeight - clientHeight - scrollTop;
                
                if (diff < 1 && this.limit <= 845) {
                    this.limit += 60;
                    await pokedex.fetchPokedex(this.limit);
                }
            },

            async searchPokemon() {
                if (this.input) {
                    this.handleScrollEnabled = false;
                    const formattedInput = this.input.toLowerCase().replace(' ', '-');
                    const pokemon = await pokedex.fetchPokemonByName(formattedInput);
                    this.foundPokemon = pokemon;
                } 
                
                else {
                    this.handleScrollEnabled = true;
                    this.foundPokemon = null;
                }
            },
        },

        computed: {
            pokemonList(): Pokemon[] {
                return pokedex.pokedexState.pokedex
            },
        },

        watch: {
            input() {
                this.searchPokemon();
            },

            'pokedex.pokedexState.pokedex'(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.$forceUpdate();
                }
            },
        },
    });
</script>

<style scoped lang="scss">
    @import './styles.scss';
</style>
