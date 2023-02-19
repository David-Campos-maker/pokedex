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

            <types-card v-bind:types="pokemon?.pokemonTypes"></types-card>

            <!-- Button trigger modal -->
            <button @click="modalTrigger()" type="button" 
                class="btn info-card__btn-modal-trigger">
                Show Details
            </button>

            <!-- Modal -->

            <div class="modal fade" ref="info-modal" tabindex="-1" aria-labelledby="" aria-hidden="true">
                <div class="modal-dialog info-card__modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 info-card__modal-name" id="exampleModalLabel">
                                {{ pokemon?.name }}
                            </h1>
                            <button @click="clearMoves()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body show-details__container">
                            <div class="show-details__general-info">
                                <div class="pokedex-col">
                                    <div class="show-details__pokemon-sprite">
                                        <div class="show-details__sprite-default">
                                            <img class="show-details__pokemon-sprite__img" :src="pokemon?.sprites.default" alt="sprite">
                                        </div>
                                        <div class="show-details__sprite-shiny">
                                            <img class="show-details__pokemon-sprite__img" :src="pokemon?.sprites.shiny" alt="sprite">
                                        </div>
                                    </div>
                                    <div class="show-details__stat-card">
                                        <stats-card v-bind:pokemonStats="pokemon?.pokemonStats"></stats-card>
                                    </div>
                                </div>
                                <div>
                                    <move-card v-bind:moves="moves"></move-card>
                                </div>
                            </div>
                            <div class="show-details__evolution__container">
                                <evolution-card v-bind:evolution="evolution"></evolution-card>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <types-card v-bind:types="pokemon?.pokemonTypes"></types-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Pokemon from "../../entities/Pokemon";
    import type IMoves from '../../Interfaces/IMoves';
    import api from "../../services/api";
    import MoveCard from "../MovesCard/MoveCard.vue";
    import StatsCard from "../StatsCard/StatsCard.vue";
    import TypesCard from "../TypesCard/TypesCard.vue";
    import EvolutionCard from "../EvolutionCard/EvolutionCard.vue";
    import getEvolutionTree from "../../functions/getEvolutionTree";
    import getEvolutionChainUrl from "../../functions/getEvolutionChainUrl";
    import axios from "axios";
    import type IEvolution from "../../Interfaces/IEvolution";

    export default  defineComponent({
        components: { 
            MoveCard , 
            StatsCard , 
            EvolutionCard , 
            TypesCard
        } ,

        name: "info-card" ,

        props: {
            pokemon: Pokemon,
        },

        data() {
            let modalRef: any = null;
            let moves: Array<IMoves> = [];

            return {
                modalRef ,
                moves ,
                evolution: {} as IEvolution ,
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

            async getMoves() {
                this.pokemon!.moves.map((move: string) => {

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

            async getEvolutions() {
                const res = await axios.get(await getEvolutionChainUrl(this.pokemon!.evolutionChain));
                this.evolution = await getEvolutionTree(res.data.chain);
            },

            clearMoves() {
                this.moves = [];
            },

            async modalTrigger() {
                await this.getEvolutions();
                await this.getMoves();
                this.toggleModal();
            }
        }
    })
</script>

<style scoped lang="scss">
@import "./styles.scss";
@import "../../assets/scss/styles.scss";
</style>