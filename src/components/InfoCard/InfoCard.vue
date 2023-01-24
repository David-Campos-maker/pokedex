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

            <!-- Button trigger modal -->
            <button type="button" class="btn info-card__btn-trigger-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Show Details
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body show-details__container">
                            <move-card :pokemon="pokemon"></move-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import Pokemon from "../../entities/Pokemon";
    import MoveCard from "../MovesCard/MoveCard.vue";

    export default  defineComponent({
        components: { MoveCard } ,

        name: "info-card" ,

        props: {
            pokemon: Pokemon,
        },
    })
</script>

<style scoped lang="scss">
@import "./styles.scss";
</style>