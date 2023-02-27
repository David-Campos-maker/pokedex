<template>
    <div class="info-card__container">
        <div class="info-card__card">
            <div class="info-card__header">
                <div class="info-card__pokemon-id">
                    #{{ pokemon?.id }}
                </div>

                <div class="info-card__pokemon-weigth">
                    {{ pokemon?.weight }}Kg
                </div>

                <div class="info-card__pokemon-height">
                    {{ pokemon?.height }}m
                </div>

                <div class="info-card__pokemon-sprite">
                    <img class="info-card__pokemon-sprite__img" :src="pokemon?.sprites.default" alt="sprite">
                </div>
            </div>
            
            <div class="info-card__pokemon-name">
                {{ pokemon?.name }}
            </div>

            <types-card v-if="pokemon?.pokemonTypes" :types="pokemon.pokemonTypes"></types-card>

            <!-- Button trigger modal -->
            <button @click="modalTrigger()" type="button" 
                class="btn info-card__btn-modal-trigger">
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
                            <button @click="clearMoves()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body show-details__container">
                            <div class="show-details__general-info">
                                <div class="show-detais__pokemon-form">
                                    <div class="show-details__pokemon-sprite">
                                        <div class="show-details__sprite">
                                            <img class="show-details__pokemon-sprite__img" :src="pokemon?.sprites.default" alt="sprite">
                                        </div>
                                        <div class="show-details__sprite-shiny">
                                            <img class="show-details__pokemon-sprite__img" :src="pokemon?.sprites.shiny" alt="sprite">
                                        </div>
                                    </div>
                                    <div class="show-details__pokemon-entries">
                                        {{ entries }}
                                    </div> 
                                    <div class="show-details__pokemon-abilities">
                                        <div v-for="ability of pokemon?.abilities" :key="ability.ability">
                                            <div class="info-card__pokemon-abilities__hidden" v-if="ability.is_hidden">
                                                {{ ability.ability }}
                                            </div>
                                            <div class="info-card__pokemon-abilities" v-else> 
                                                {{ ability.ability }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="show-details__stat-card">
                                        <stats-card v-bind:pokemonStats="pokemon?.pokemonStats"></stats-card>
                                    </div>
                                </div>
                                <div class="show-details__move-container">
                                    <move-card v-if="moves.length > 0" :moves="moves"></move-card>
                                </div>
                            </div>
                            <div class="show-details__evolution__container">
                                <evolution-card v-if="evolution" :evolution="evolution"></evolution-card>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <types-card v-if="pokemon?.pokemonTypes" :types="pokemon.pokemonTypes"></types-card>
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
            let evolution = {} as IEvolution;
            let entries = '';

            return {
                modalRef ,
                moves ,
                evolution ,
                entries
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

            async getEntriesText() {
                const response = await api.get(this.pokemon!.speciesUrl);

                for(const element of response.data.flavor_text_entries) {
                    if (element.language.name == 'en') {
                        this.entries = element.flavor_text;
                        break;
                    }
                }
            },

            async getMoves() {
                const moves = await Promise.all(this.pokemon!.moves.map(async (move: string) => {
                    const res = await api.get(move);

                    return {
                        name: res.data.name.replace(/-/g , " "),
                        accuracy: res.data.accuracy,
                        damage_class: res.data.damage_class.name,
                        power: res.data.power,
                        pp: res.data.pp,
                        type: res.data.type.name
                    };
                }));
                this.moves = moves;
            },

            async getEvolutions() {
                const res = await api.get(await getEvolutionChainUrl(this.pokemon!.speciesUrl));
                this.evolution = await getEvolutionTree(res.data.chain);
            },

            clearMoves() {
                this.moves = [];
            },

            async modalTrigger() {
                await this.getEntriesText();
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