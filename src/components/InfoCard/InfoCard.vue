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

            <div class="info-card__pokemon-height">
                {{ pokemon?.height }}m
            </div>

            <div class="info-card__pokemon-weigth">
                {{ pokemon?.weight }}Kg
            </div>

            <div class="info-card__pokemon-types">
                <span class="info-card__pokemon-types__type" v-for="types in pokemon?.pokemonTypes" :key="types">
                    {{ types.pokemonType }}
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

<style scoped>
@import "./styles.scss";
</style>