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
            <button @click="toggleModal() , getMoves() , getEvolutions()" type="button" 
                class="btn info-card__btn-trigger-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                            <button @click="clearMoves() , clearEvolutions()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body show-details__container">
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
                                    <stats-card :pokemon="pokemon"></stats-card>
                                </div>
                                <div class="pokedex-row">
                                    <div class="pokedex-col" v-for="evolution in evolutions" :key="evolution">
                                        <img :src="evolution.sprite" alt="evolution">
                                        <div>{{ evolution.id }}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <move-card v-bind:moves="moves"></move-card>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <div class="info-card__pokemon-types">
                                <span v-bind:class="types.pokemonType" v-for="(types , index) of pokemon?.pokemonTypes" :key="types">
                                    {{ types.pokemonType }}
                                    <span class="before-type" v-if="index != Object.keys(pokemon.pokemonTypes).length - 1"></span>
                                </span>
                            </div>
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
    import type IEvolution from '../../Interfaces/IEvolution';
    import api from "../../services/api";
    import MoveCard from "../MovesCard/MoveCard.vue";
    import StatsCard from "../StatsCard/StatsCard.vue";
    import getPokemonTypes from "../../functions/getPokemonTypes";

    export default  defineComponent({
        components: { MoveCard , StatsCard} ,

        name: "info-card" ,

        props: {
            pokemon: Pokemon,
        },

        data() {
            let modalRef: any = null;
            let moves: Array<IMoves> = [];
            let evolutions: Array<IEvolution> = [];

            return {
                modalRef ,
                moves ,
                evolutions
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
            },

            getEvolutions() {
                api.get(this.pokemon!.evolutionChain).then((response) => {
                    api.get(response.data.evolution_chain.url).then((res) => {
                        let evoData = res.data.chain;
                        let count = 0;

                        do {
                            const numberOfEvolutions = evoData['evolves_to'].length;

                            api.get('https://pokeapi.co/api/v2/pokemon/' + `${evoData.species.name}`).then(res => {
                                let evolution: IEvolution = {
                                    id: count,
                                    name: res.data.name,
                                    sprite: res.data.sprites.front_default,
                                    type: getPokemonTypes(res.data.types)
                                }
                                this.evolutions.push(evolution);
                                count += 1
                            });

                            if(numberOfEvolutions > 1) {
                                for(let i = 1; i < numberOfEvolutions; i++) {
                                    api.get('https://pokeapi.co/api/v2/pokemon/' + `${evoData.evolves_to[i].species.name}`).then(res => {
                                        let evolution: IEvolution = {
                                            id: count,
                                            name: res.data.name,
                                            sprite: res.data.sprites.front_default,
                                            type: getPokemonTypes(res.data.types)
                                        }
                                        this.evolutions.push(evolution);
                                        count += 1
                                    });
                                }
                            }
                            
                            evoData = evoData['evolves_to'][0];
                        } while(!!evoData && Object.prototype.hasOwnProperty.call(evoData, 'evolves_to'));
                    });
                });

                this.evolutions.sort((n1 , n2) => {
                    if (n1.id > n2.id) return 1;
                    if (n1.id < n2.id) return -1;

                    return 0;
                })
            },

            clearEvolutions() {
                this.evolutions = [];
            }
        }
    })
</script>

<style scoped lang="scss">
@import "./styles.scss";
@import "../../assets/scss/styles.scss";
</style>