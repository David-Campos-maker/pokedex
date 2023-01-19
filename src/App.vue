<template>
  <PokemonCard/>
</template>

<script lang="ts">
  import PokemonCard from '../src/components/PokemonCard/PokemonCard.vue';
  
  export default {
    components: {
      PokemonCard,
    },
    name: "pokedex-home"
  }
</script>
<style scoped lang="scss">
@import "../src/assets/scss/styles.scss";
</style>
