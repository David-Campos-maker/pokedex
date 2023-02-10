<template>
  <KeepAlive>
    <PokemonCard/>
  </KeepAlive>
</template>

<script lang="ts">
  import { defineAsyncComponent } from 'vue';
  
  export default {
    name: "pokedex-home",

    components: {
      PokemonCard: defineAsyncComponent(() => import('./components/PokemonCard/PokemonCard.vue'))
    },
  }
</script>
<style scoped lang="scss">
@import "../src/assets/scss/styles.scss";
</style>
