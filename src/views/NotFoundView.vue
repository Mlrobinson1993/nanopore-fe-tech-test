<script setup lang="ts">
import PageHeader from '@/components/headers/PageHeader.vue'
</script>

<template>
  <div class="not-found-view">
    <PageHeader
      heading="Oops!"
      subheading="We can't seem to find what you're looking for."
      :links="[]"
    />
    <main>
      <h1>404</h1>
    </main>
  </div>
</template>

<style>
.not-found-view {
  flex: 1;
}
</style>
