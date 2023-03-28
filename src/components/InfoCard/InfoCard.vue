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
                    <img class="info-card__pokemon-sprite__img pokedex__pokemon-sprites__img" :src="pokemon?.sprites.default" alt="sprite">
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
        </div>
    </div>
  
</template>

<script lang="ts">
    import { defineComponent , createApp } from "vue";
    import Pokemon from "../../entities/Pokemon";
    import TypesCard from "../TypesCard/TypesCard.vue";
    import DetailsModal from "../Modal/DetailsModal.vue";

    export default  defineComponent({
        components: {  
            TypesCard ,  
        } ,

        name: "info-card" ,

        props: {
            pokemon: Pokemon,
        },

        methods: {
            async modalTrigger() {
                const modalContainer = document.createElement('div');
                document.body.appendChild(modalContainer);

                const modalApp = createApp(DetailsModal, {
                    pokemon: this.pokemon,
                    onClose: () => {
                    modalApp.unmount();
                    document.body.removeChild(modalContainer);
                    },
                });
                const modalInstance = modalApp.mount(modalContainer) as any;

                await modalInstance.fetchData();
                modalInstance.showModal();
            }
        }
    });
</script>

<style scoped lang="scss">
@import "./styles.scss";
@import "../../assets/scss/styles.scss";
</style>