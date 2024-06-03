<script setup lang="ts">
import CustomerList from '@/components/lists/CustomerList.vue'
import SpinnerSrc from '@/assets/spinner.svg'
</script>

<template>
  <main>
    <Suspense>
      <CustomerList />
      <template #fallback>
        <img :src="SpinnerSrc" class="spinner" alt="loading spinner" />
      </template>
    </Suspense>
  </main>
</template>

<style>
.spinner {
  display: block;
  margin: 0 auto;
}
</style>
