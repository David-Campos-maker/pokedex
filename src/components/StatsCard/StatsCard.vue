<template>
    <div class="stats-card__container pokedex-col">
        <div class="stats-card__stat-info pokedex-row" v-for="stat in pokemon?.pokemonStats" :key="stat">
            <p class="stats-card__stat">{{ stat.stat }}</p>
            <p class="stats-card__base-stat">{{ stat.baseStat}}</p>
            <div class="stas-card__quality-bar">
                <div v-bind:style="getStyleClass(stat.baseStat)"></div>
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
                        'border-radius':'3px',
                        'background-color': '#ed1f1f',
                        'overflow': 'hidden',
                        'width': `${baseStat / 2}%`,
                        'height': '8px',
                        'position': 'relative',
                    }

                    return results;
                }

                if(baseStat <= 100) {
                    let results: any = {
                        'border-radius':'3px',
                        'background-color': '#f18c1a',
                        'overflow': 'hidden',
                        'width': `${baseStat / 2}%`,
                        'height': '8px',
                        'position': 'relative',
                    }

                    return results;
                }

                if(baseStat <= 140) {
                    let results: any = {
                        'border-radius':'3px',
                        'background-color': '#ffd11a',
                        'overflow': 'hidden',
                        'width': `${baseStat / 2}%`,
                        'height': '8px',
                        'position': 'relative',
                    }

                    return results;
                }

                if(baseStat <= 180) {
                    let results: any = {
                        'border-radius':'3px',
                        'background-color': '#22c02a',
                        'overflow': 'hidden',
                        'width': `${baseStat / 2}%`,
                        'height': '8px',
                        'position': 'relative',
                    }

                    return results;
                }

                if(baseStat <= 250) {
                    if (baseStat >= 200) {
                        let results: any = {
                        'border-radius':'3px',
                        'background-color': '#319de3',
                        'overflow': 'hidden',
                        'width': '200px',
                        'height': '8px',
                        'position': 'relative',
                    }

                    return results;
                    }
                    let results: any = {
                        'border-radius':'3px',
                        'background-color': '#319de3',
                        'overflow': 'hidden',
                        'width': `${baseStat}px`,
                        'height': '8px',
                        'position': 'relative',
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