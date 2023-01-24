<template>
    <div class="info-card__container">
        <div class="info-card__card">
            <div class="info-card__header">
                <div class="info-card__pokemon-id">
                    #{{ pokemon?.id }}
                </div>

                <div class="info-card__pokemon-sprite">
                    <img class="info-card__pokemon-sprite__img" :src="pokemon?.sprites.default" alt="sprite">
                </div>
            </div>
            
            <div class="info-card__pokemon-name">
                {{ pokemon?.name }}
            </div>

            <div class="info-card__pokemon-types">
                <span v-bind:class="types.pokemonType" v-for="(types , index) of pokemon?.pokemonTypes" :key="types">
                    {{ types.pokemonType }}
                    <span class="before-type" v-if="index != Object.keys(pokemon.pokemonTypes).length - 1"></span>
                </span>
            </div>
        </div>
    </div>
  
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import Pokemon from "../../entities/Pokemon";

    export default  defineComponent({
        name: "info-card" ,

        props: {
            pokemon: Pokemon,
        },
    })
</script>

<style scoped lang="scss">
@import "./styles.scss";
</style>