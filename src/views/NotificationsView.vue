<script setup lang="ts">
import BaseView from '@/views/BaseView.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <BaseView heading="Notifications" viewClass="notifications-view">
    <h1>{{ route.name }} page</h1>
    <slot />
  </BaseView>
</template>

<style>
.notifications-view {
  flex: 1;
}
</style>
