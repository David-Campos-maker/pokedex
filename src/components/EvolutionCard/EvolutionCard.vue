<template>
    <div class="evolution-card">
        <div class="evolution-card__step">
            <div class="evolution-card__pokemon">
                <img :src="evolution?.sprite" :alt="evolution?.name">
                <div class="evolution-card__name">{{ evolution?.name }}</div>
                <div>
                    <types-card v-bind:types="evolution?.types"></types-card>
                </div>
            </div>
            <div class="evolution-card__group">
                <div class="evolution-card__step" v-for="step of evolution?.next_step" :key="step.id">
                    <span class="evolution-card__arrow material-symbols-rounded">
                        arrow_forward
                    </span>
                        <evolution-card v-bind:evolution="step"></evolution-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import type IEvolution from '../../Interfaces/IEvolution';
import TypesCard from '../TypesCard/TypesCard.vue';

    export default defineComponent({
  components: { TypesCard },
        name: "evolution-card" ,

        props: {
            evolution: {
                type: Object as () => IEvolution
            }
        },
    });
</script>

<style scoped lang="scss">
    @import "./styles.scss";
</style>