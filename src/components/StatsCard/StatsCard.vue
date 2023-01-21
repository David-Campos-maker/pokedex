<template>
    <div class="stats-card__container pokedex-col">
        <div class="stats-card__stat-info pokedex-row" v-for="stat in pokemon?.pokemonStats" :key="stat">
            <p class="stats-card__stat">{{ stat.stat }}</p>
            <p class="stats-card__base-stat">{{ stat.baseStat}}</p>
            <div class="stas-card__quality-bar">
                <div class="stas-card__quality-bar__quality" v-bind:style="getStyleClass(stat.baseStat)"></div>
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
            getStyleClass: function (baseStat: number): any {
                if(baseStat <= 55) {
                    let results: any = {
                        'background-color': '#fd3917',
                        'width': `${(baseStat * 100) / 275}%`,
                    }

                    return results;
                }

                if(baseStat <= 110) {
                    let results: any = {
                        'background-color': '#fda726',
                        'width': `${(baseStat * 100) / 275}%`,
                    }

                    return results;
                }

                if(baseStat <= 165) {
                    let results: any = {
                        'background-color': '#f7e819',
                        'width': `${(baseStat * 100) / 275}%`,
                    }

                    return results;
                }

                if(baseStat <= 220) {
                    let results: any = {
                        'background-color': '#2fe43e',
                        'width': `${(baseStat * 100) / 275}%`,
                    }

                    return results;
                }

                if(baseStat > 220) {
                    let results: any = {
                        'background-color': '#6fa7fc',
                        'width': `${(baseStat * 100) / 275}%`,
                    }

                    return results;
                }
            }
        }
    })
</script>

<style scoped lang="scss">
    @import "./styles.scss";
    @import "../../assets/scss/styles.scss";
</style>