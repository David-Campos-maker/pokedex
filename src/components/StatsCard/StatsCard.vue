<template>
    <div class="stats-card__container pokedex-col">
        <div class="stats-card__stat-info pokedex-row" v-for="stat in pokemon?.pokemonStats" :key="stat.stat">
            <p class="stats-card__stat">{{ stat.stat }}</p>
            <p class="stats-card__base-stat">{{ stat.baseStat}}</p>
            <div class="stas-card__quality-bar">
                <div class="stas-card__quality-bar__quality" 
                    :class="getStyleClass(stat.baseStat)" 
                    :style="getQualityBarWidth(stat.baseStat)">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Pokemon from '../../entities/Pokemon';

    export default defineComponent({
        name: "stats-card" ,
        props: {pokemon: Pokemon} , 

        methods: {
            getStyleClass(baseStat: number): string {
                let result !: string

                if(baseStat <= 55) result = "stas-card__quality-bar__very-low";
                if(baseStat > 55 && baseStat <= 110) result = "stas-card__quality-bar__low";
                if(baseStat > 110 && baseStat <= 165) result = "stas-card__quality-bar__normal";
                if(baseStat > 165 && baseStat <= 220) result = "stas-card__quality-bar__great";
                if(baseStat > 220) result = "stas-card__quality-bar__excellent";

                return result;
            },

            getQualityBarWidth: function(baseStat: number): string {
                let result = `width: ${(baseStat * 100) / 275}%`;
                return result;
            }
        }
    })
</script>

<style scoped lang="scss">
    @import "./styles.scss";
    @import "../../assets/scss/styles.scss";
</style>