<template>
  <PokemonCard/>
</template>

<script lang="ts">
  import PokemonCard from '../src/components/PokemonCard.vue';
  
  export default {
    components: {
      PokemonCard,
    },
    name: "pokedex-home"
  }
</script>
<style scoped>
@import './assets/styles.scss'
</style>
