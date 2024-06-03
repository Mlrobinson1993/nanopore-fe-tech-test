<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
type Props = {
  icon: string
}
defineProps<Props>()
</script>

<template>
  <FontAwesomeIcon :icon="['fa', icon]" />
</template>
