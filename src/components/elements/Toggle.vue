<script setup lang="ts">
type Props = {
  modelValue: boolean
}
defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const toggle = (event: Event): void => {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.checked)
}
</script>

<template>
  <label class="toggle-switch">
    <input type="checkbox" :checked="modelValue" @change="toggle" />
    <span class="slider"></span>
  </label>
</template>

<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: var(--size-xl);
  height: var(--size-sm);
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: calc(var(--size-md) * 2);
}

.slider:before {
  position: absolute;
  content: '';
  height: var(--size-xs);
  width: var(--size-xs);
  left: 2px;
  bottom: 2px;
  background-color: var(--light-color);
  transition: 0.4s;
  border-radius: var(--border-radius-circle);
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(var(--spacing-md));
}
</style>
