<template>
    <div class="types-card__container">
        <span v-bind:class="type.pokemonType" v-for="(type , index) of types" :key="type.pokemonType">
            {{ type.pokemonType }}
            <span class="before-type" v-if="types && index != Object.keys(types).length - 1"></span>
        </span>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'type-card',

        props: {
            types: {
                type: Array
            }
        }
    })

</script>

<style lang="scss">
    @import url('./styles.scss');
</style>