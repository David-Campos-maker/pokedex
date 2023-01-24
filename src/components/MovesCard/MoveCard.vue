<template>
    <div>
        OI
        <div class="moves-card__content" v-for="move in moves" :key="move">{{ move.name }}</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Pokemon from '../../entities/Pokemon';
    import IMoves from '../../Interfaces/IMoves';
    import api from '../../services/api';

    export default defineComponent({
        name: 'moves-card' ,
        
        props: {
            pokemon: Pokemon
        } ,

        data() {
            const moves: Array<IMoves> = []

            return {
                moves
            }
        },

        mounted() {
            this.getMoves()
        },

        methods: {
            getMoves() {
                this.pokemon?.moves.forEach((move: string) => {

                    api.get(move).then(res => {
                        const object: IMoves = {
                            name: res.data.name ,
                            accuracy: res.data.accuracy ,
                            damage_class: res.data.damage_class.name ,
                            power: res.data.power ,
                            pp: res.data.pp ,
                            priority: res.data.priority ,
                            type: res.data.type.name
                        }
                        
                        this.moves.push(object);
                    });
                })
            }
        }
    })

</script>

<style lang="scss">

</style>