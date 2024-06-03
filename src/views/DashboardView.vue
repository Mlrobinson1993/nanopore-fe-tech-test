<script setup lang="ts">
import BaseView from '@/views/BaseView.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <BaseView heading="Dashboard" viewClass="dashboard-view">
    <h1>{{ route.name }} page</h1>
    <slot />
  </BaseView>
</template>

<style>
.dashboard-view {
  flex: 1;
}
</style>
