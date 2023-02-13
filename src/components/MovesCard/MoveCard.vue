<template>
    <div class="move-card__container">
        <div class="move-card__title">
            <div class="move-card__title__content">
                <div class="move-card__detail-title move-title">
                    Move
                </div>
                <div class="move-card__detail-title">
                    Power
                </div>
                <div class="move-card__detail-title">
                    Acc.
                </div>
                <div class="move-card__detail-title">
                    PP
                </div>
            </div>
        </div>
        <div class="move-card__content" v-for="move in moves" :key="move.name">
            <div class="move-card__move">
                <div class="move-card__move-name">
                    {{ move.name }}
                </div>
                <div class="move-card__move-power">
                    <div v-if="move.power != null">
                        {{ move.power }}
                    </div>
                    <div v-else>-</div>
                </div>
                <div class="move-card__move-accuracy">
                    <div v-if="move.accuracy != null">
                        {{ move.accuracy }}
                    </div>
                    <div v-else>-</div>
                </div>
                <div class="move-card__move-pp">
                    {{ move.pp }}
                </div>
            </div>

            <div class="move-card__move-detais">
                <div class="move-card__move-type" :class="move.type">
                    {{ move.type }}
                </div>
                <div class="move-card__move-damage-class" :class="move.damage_class">
                    {{ move.damage_class }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'moves-card' ,
        
        props: {
            moves: Array
        }
    })

</script>

<style scoped lang="scss">
@import './styles.scss';
</style>