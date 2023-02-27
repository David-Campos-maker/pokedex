<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-center">
            <div class="pokedex__main-container mx-auto">
                <div class="form-outline pokedex__search-bar">
                    <input v-model="input" type="search" 
                            class="form-control rounded pokedex__serach-pokemon" 
                            placeholder="Search for a Pokémon" 
                            aria-label="Search" 
                            aria-describedby="search-addon" 
                    />
                </div>
                
                <div class="pokedex__main-container">
            
                    <div class="pokemon-card__container" v-for="pokemon in filteredPokedex" :key="pokemon.id">
                        <keep-alive>
                            <info-card :pokemon="pokemon"></info-card>
                        </keep-alive>
                    </div>
            
                    <div class="pokedex__no-pokemon-found" v-if="input&&!filteredPokedex.length">
                        <p>No Pokémon found...</p>
                        <div class="pokedex__error-code">
                            4 <img class="pokedex__logo" src="../../assets/logo.png" alt="logo"> 4
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
    import { defineComponent, defineAsyncComponent } from 'vue';

    interface ComponentData {
        input: string;
        limit: number;
        loadingMore: boolean;
        windowHeight: number;
    }

    export default defineComponent({
        components: {
            InfoCard: defineAsyncComponent(() => import('../InfoCard/InfoCard.vue')),
        },

        data(): ComponentData {
            return {
                input: '',
                limit: 60,
                loadingMore: false,
                windowHeight: window.innerHeight,
            };
        },

        created() {
            pokedex.fetchPokedex(this.limit);
            window.addEventListener('scroll', this.loadMore);
            window.addEventListener('resize', this.handleResize);
        },

        beforeUnmount() {
            window.removeEventListener('scroll', this.loadMore);
            window.removeEventListener('resize', this.handleResize);
        },

        methods: {
            async loadMore() {
                const currentScrollPosition = window.pageYOffset;
                const maxScrollPosition =
                    document.documentElement.scrollHeight - this.windowHeight;

                if (currentScrollPosition === maxScrollPosition && this.limit <= 845) {
                    if (!this.loadingMore) {
                        this.loadingMore = true;
                        this.limit += 60;
                        await pokedex.fetchPokedex(this.limit);
                        this.loadingMore = false;
                    }
                }
            },

            handleResize() {
                this.windowHeight = window.innerHeight;
                this.$forceUpdate();
            },
        },

        computed: {
            filteredPokedex(): Pokemon[] {
                const input = this.input;
                return pokedex.pokedexState.pokedex.filter((pokemon: Pokemon) =>
                    pokemon.name.toLowerCase().includes(input.toLowerCase())
                );
            },
        },

        watch: {
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
