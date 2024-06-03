<script setup lang="ts">
import { onUnmounted } from 'vue'

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

document.body.style.overflow = 'hidden'

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <div class="modal" @click="closeModal">
    <div @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>
