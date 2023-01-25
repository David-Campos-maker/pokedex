<template>
    <div>
        <div class="moves-card__content" v-for="move in moves" :key="move">{{ move.name }}</div>
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

<style lang="scss">

</style>