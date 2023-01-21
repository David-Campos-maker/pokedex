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
                if(baseStat <= 50) {
                    let results: any = {
                        'background-color': '#f83117',
                        'width': `${(baseStat * 100) / 275}%`,
                    }

                    return results;
                }

                if(baseStat <= 100) {
                    let results: any = {
                        'background-color': '#f87924',
                        'width': `${(baseStat * 100) / 275}%`,
                    }

                    return results;
                }

                if(baseStat <= 120) {
                    let results: any = {
                        'background-color': '#ffbb29',
                        'width': `${(baseStat * 100) / 275}%`,
                    }

                    return results;
                }

                if(baseStat <= 190) {
                    let results: any = {
                        'background-color': '#2ecc19',
                        'width': `${(baseStat * 100) / 275}%`,
                    }

                    return results;
                }

                if(baseStat > 190) {
                    let results: any = {
                        'background-color': '#349dff',
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