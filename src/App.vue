<template>
  <KeepAlive>
    <PokemonCard/>
  </KeepAlive>
</template>

<script lang="ts">
  import { defineAsyncComponent } from "vue";
  
  export default {
    components: {
      PokemonCard: defineAsyncComponent(() => import('../src/components/PokemonCard/PokemonCard.vue'))
    },
    name: "pokedex-home"
  }
</script>
<style scoped lang="scss">
@import "../src/assets/scss/styles.scss";
</style>
