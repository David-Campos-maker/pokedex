<template>
    <div>
        Move Card
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'moves-card' ,
        
        props: {
            moves: Array
        },
    })

</script>

<style lang="scss">

</style>