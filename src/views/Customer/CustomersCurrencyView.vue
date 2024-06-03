<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main>{{ route.name }} page</main>
</template>

<style scoped>
main {
  padding: var(--spacing-lg);
}
</style>
