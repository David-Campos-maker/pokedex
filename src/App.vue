<template>
    <PokemonCard/>
</template>

<script lang="ts">
  import PokemonCard from './components/PokemonCard/PokemonCard.vue';
  
  export default {
    name: "pokedex-home",

    components: {
      PokemonCard
    },
  }
</script>
<style scoped lang="scss">
@import "../src/assets/scss/styles.scss";
</style>
