<template>
    <div class="evolution-card">
        <div class="evolution-card__step">
            <div class="evolution-card__pokemon">
                <div class="evolution-card__evolution-header">
                    <div>
                        <img :src="evolution?.sprite" :alt="evolution?.name">
                    </div>
                    <div class="evolution-card__id">#{{ evolution?.id }}</div>
                </div>
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
    import TypesCard from '../TypesCard/TypesCard.vue';

    export default defineComponent({
  components: { TypesCard },
        name: "evolution-card" ,

        props: {
            evolution: {
                type: Object
            }
        },
    });
</script>

<style scoped lang="scss">
    @import "./styles.scss";
</style>