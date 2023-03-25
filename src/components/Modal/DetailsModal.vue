<template>
  <div class="modal fade" ref="info-modal" tabindex="-1" aria-labelledby="" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5 show-details__pokemon-name" id="exampleModalLabel">
                {{ pokemon?.name }}
            </h1>
            <button @click="clearMoves()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body show-details__container">
            <div class="show-details__general-info">
                <div class="show-details__pokemon-form">
                    <div class="show-details__pokemon-sprite">
                        <div class="show-details__sprite">
                            <img class="show-details__pokemon-sprite__img pokedex__pokemon-sprites__img" 
                            :src="pokemon?.sprites.default" alt="sprite">
                        </div>
                        <div class="show-details__sprite-shiny">
                            <img class="show-details__pokemon-sprite__img pokedex__pokemon-sprites__img" 
                            :src="pokemon?.sprites.shiny" alt="sprite">
                        </div>
                    </div>
                    <div class="show-details__pokemon-entries">
                        {{ entries }}
                    </div> 
                    <div class="show-details__pokemon-abilities">
                        <div v-for="ability of pokemon?.abilities" :key="ability.ability">
                            <div class="show-details__pokemon-abilities__ability-hidden" v-if="ability.is_hidden">
                                {{ ability.ability }}
                            </div>
                            <div class="show-details__pokemon-abilities__ability" v-else> 
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
</template>

<script lang="ts">
  import Pokemon from '@/entities/Pokemon';
  import { defineComponent } from 'vue';
  import MoveCard from "../MovesCard/MoveCard.vue";
  import StatsCard from "../StatsCard/StatsCard.vue";
  import EvolutionCard from "../EvolutionCard/EvolutionCard.vue";
  import TypesCard from "../TypesCard/TypesCard.vue";
  import type IMoves from '../../Interfaces/IMoves';
  import api from "../../services/api";
  import getEvolutionTree from "../../functions/getEvolutionTree";
  import type IEvolution from "../../Interfaces/IEvolution";

  declare global {
    interface Window {
      myCache: Record<string, any>;
    }
  }

  if (!window.myCache) {
    window.myCache = {};
  }

  export default defineComponent({
    name:"details-modal",

    components: {
      MoveCard , 
      StatsCard , 
      EvolutionCard , 
      TypesCard , 
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
        entries ,
      }
    },

    props: {
      pokemon: Pokemon
    },

    methods: {
      async getData() {
        const speciesResponse = await api.get(this.pokemon!.speciesUrl);
        for (const element of speciesResponse.data.flavor_text_entries) {
          if (element.language.name == 'en') {
            this.entries = element.flavor_text;
            break;
          }
        }

        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
        const evolutionResponse = await api.get(evolutionChainUrl);
        this.evolution = await getEvolutionTree(evolutionResponse.data.chain);
      },

      async getMove(move: string) {
        if (window.myCache[move]) {
          return window.myCache[move];
        }

        const res = await api.get(move);
        const data = {
          name: res.data.name.replace(/-/g , " "),
          accuracy: res.data.accuracy,
          damage_class: res.data.damage_class.name,
          power: res.data.power,
          pp: res.data.pp,
          type: res.data.type.name
        };

        window.myCache[move] = data;

        return data;
      },

      async getMoves() {
        if (!this.pokemon) return;

        const batchSize = 10;
        let moves: IMoves[] = [];
        for (let i = 0; i < this.pokemon!.moves.length; i += batchSize) {
          const batchMoves: IMoves [] = await Promise.all(
            this.pokemon!.moves.slice(i, i + batchSize).map(async (move: string) => {
              return this.getMove(move);
            })
          );
          moves = moves.concat(batchMoves);
        }
        this.moves = moves;
      },

      clearMoves() {
        this.moves = [];
      },

      async fetchData() {
        await this.getData();
        await this.getMoves();
      },

      async showModal() {
        if(!this.modalRef) {
          this.modalRef = new (window as any).bootstrap.Modal(this.$refs["info-modal"]);
        }
        this.modalRef.toggle();
      }
    }
  });
</script>

<style lang="scss" scoped>
    @import "./styles.scss";
</style>