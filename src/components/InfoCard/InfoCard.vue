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
            <button @click="toggleModal() , getMoves()" type="button" class="btn info-card__btn-trigger-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Show Details
            </button>

            <!-- Modal -->
            <div class="modal fade" ref="info-modal" tabindex="-1" aria-labelledby="" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 info-card__modal-name" id="exampleModalLabel">
                                {{ pokemon?.name }}
                            </h1>
                            <div class="info-card__pokemon-types">
                                <span v-bind:class="types.pokemonType" v-for="(types , index) of pokemon?.pokemonTypes" :key="types">
                                    {{ types.pokemonType }}
                                    <span class="before-type" v-if="index != Object.keys(pokemon.pokemonTypes).length - 1"></span>
                                </span>
                            </div>
                            <button @click="clearMoves()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body show-details__container">
                            <stats-card :pokemon="pokemon"></stats-card>
                            <move-card v-bind:moves="moves"></move-card>
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
    import type IMoves from '../../Interfaces/IMoves';
    import api from "../../services/api";
    import MoveCard from "../MovesCard/MoveCard.vue";
    import StatsCard from "../StatsCard/StatsCard.vue";

    export default  defineComponent({
        components: { MoveCard , StatsCard} ,

        name: "info-card" ,

        props: {
            pokemon: Pokemon,
        },

        data() {
            let modalRef: any = null;
            let moves: Array<IMoves> = [];

            return {
                modalRef ,
                moves
            }
        },

        mounted() {
            this.$refs["info-modal"];
        },

        methods: {
            toggleModal() {
                if(!this.modalRef) {
                    this.modalRef = new (window as any).bootstrap.Modal(this.$refs["info-modal"]);
                }
                this.modalRef.toggle();
            },

            getMoves() {
                this.pokemon?.moves.forEach((move: string) => {

                    api.get(move).then(res => {
                        const object: IMoves = {
                            name: res.data.name.replace(/-/g , " ") ,
                            accuracy: res.data.accuracy ,
                            damage_class: res.data.damage_class.name ,
                            power: res.data.power ,
                            pp: res.data.pp ,
                            type: res.data.type.name
                        }
                        
                        this.moves.push(object);
                    });
                })
            },

            clearMoves() {
                this.moves = [];
            }
        }
    })
</script>

<style scoped lang="scss">
@import "./styles.scss";
</style>