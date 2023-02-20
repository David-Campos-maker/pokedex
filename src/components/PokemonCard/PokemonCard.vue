<template>
    <div class="content pokedex__main-container">
        <div class="form-outline pokedex__search-bar">
            <input v-model="input" type="search" 
                    class="form-control rounded pokedex__serach-pokemon" 
                    placeholder="Search for a Pokémon" 
                    aria-label="Search" 
                    aria-describedby="search-addon" 
            />
        </div>

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
</template>

<script lang="ts">
    import pokedex from '../../entities/pokedex';
    import Pokemon from '../../entities/Pokemon';
    import { defineComponent, defineAsyncComponent } from 'vue';

    interface ComponentData {
        input: string;
    }

    export default defineComponent({
        components: {
            InfoCard: defineAsyncComponent(() => import('../InfoCard/InfoCard.vue')),
        },

        data(): ComponentData {
            return {
                input: '',
            };
        },

        created() {
            pokedex.fetchPokedex();
        },

        computed: {
            filteredPokedex(): Pokemon[] {
                return pokedex.pokedexState.pokedex.filter((pokemon: Pokemon) =>
                    pokemon.name.toLowerCase().includes(this.input.toLowerCase())
                );
            },
        },
    });
</script>

<style scoped lang="scss">
    @import './styles.scss';
</style>
