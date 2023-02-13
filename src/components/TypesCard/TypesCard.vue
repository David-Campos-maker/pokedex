<template>
    <div class="types-card__container">
        <span v-bind:class="types.pokemonType" v-for="(types , index) of pokemon?.pokemonTypes" :key="types.pokemonType">
            {{ types.pokemonType }}
            <span class="before-type" v-if="pokemon && index != Object.keys(pokemon.pokemonTypes).length - 1"></span>
        </span>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Pokemon from '../../entities/Pokemon';

    export default defineComponent({
        name: 'type-card',

        props: {
            pokemon: Pokemon
        }
    })

</script>

<style lang="scss">
    @import url('./styles.scss');
</style>