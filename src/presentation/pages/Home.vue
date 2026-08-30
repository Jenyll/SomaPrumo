<template>
  <div class="home">
    <h1>SomaPrumo (Scaffold)</h1>
    <p>Home temporária mínima para validar o scaffold.</p>
  </div>
</template>

<script setup lang="ts">
// Página mínima conforme solicitado
// nome mult-word para satisfazer regra de lint
// @ts-ignore - defineOptions may not be recognized by some parsers here
defineOptions({ name: 'HomePage' })
</script>

<style scoped>
.home { padding: 2rem; font-family: Manrope, system-ui, -apple-system, 'Segoe UI', Roboto; }
</style>
