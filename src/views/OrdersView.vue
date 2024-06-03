<script setup lang="ts">
import BaseView from '@/views/BaseView.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <BaseView heading="Orders" viewClass="orders-view">
    <h1>{{ route.name }} page</h1>
    <slot />
  </BaseView>
</template>

<style>
.orders-view {
  flex: 1;
}
</style>
