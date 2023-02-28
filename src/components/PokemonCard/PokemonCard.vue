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
    }

    export default defineComponent({
        components: {
            InfoCard: defineAsyncComponent(() => import('../InfoCard/InfoCard.vue')),
        },

        data(): ComponentData {
            return {
                input: '',
                limit: 60,
            };
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
                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = window.innerHeight;
                const scrollTop = window.pageYOffset;
                const diff = scrollHeight - clientHeight - scrollTop;
                if (diff < 1 && this.limit <= 845) {
                    this.limit += 60;
                    await pokedex.fetchPokedex(this.limit);
                }
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
