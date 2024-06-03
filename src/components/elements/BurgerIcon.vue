<script setup lang="ts">
import { ref } from 'vue'
defineProps({
  theme: {
    type: String,
    default: 'dark',
    validator: (value: string) => ['light', 'dark'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  }
})

const isOpen = ref<boolean>(false)

const toggleMenu = (): void => {
  isOpen.value = !isOpen.value
}

const emit = defineEmits(['toggle'])

const handleClick = () => {
  toggleMenu()
  emit('toggle', isOpen.value)
}
</script>

<template>
  <button @click="handleClick" :class="`burger-menu burger-menu-${theme} burger-menu-${size}`">
    <span v-for="i in 3" :key="i" :class="['burger-icon', { open: isOpen }]"></span>
  </button>
</template>

<style scoped>
.burger-menu {
  display: flex;
  width: var(--size-lg);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.burger-menu-light .burger-icon {
  background-color: var(--light-color);
}

.burger-menu-dark .burger-icon {
  background-color: var(--text-color);
}

.burger-icon {
  display: inline-block;
  border-radius: var(--border-radius-md);
  transition: all 0.2s linear;
  position: relative;
  transform-origin: 1px;
}

.burger-menu-sm > .burger-icon {
  width: var(--size-sm);
  height: 2px;
}

.burger-menu-md > .burger-icon {
  width: var(--size-md);
  height: 2px;
}

.burger-menu-lg > .burger-icon {
  width: var(--size-lg);
  height: 3px;
}

.burger-icon.open:nth-child(1),
.burger-icon.open:nth-child(3) {
  opacity: 0;
}
</style>
