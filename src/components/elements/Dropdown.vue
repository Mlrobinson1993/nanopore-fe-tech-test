<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import type { Option } from '@/types/option'

type Props = {
  options: Option[]
  defaultVal: Option
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['select'])

const isOpen = ref<boolean>(false)
const selected = ref<Option>(props.defaultVal)

const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: Option): void => {
  selected.value = option
  isOpen.value = false
  emit('select', option)
}

watch(
  () => props.defaultVal,
  (newVal) => {
    selected.value = newVal
  }
)
</script>

<template>
  <div class="dropdown">
    <button
      @click="toggleDropdown"
      class="dropdown-toggle"
      :disabled="disabled ?? false"
      type="button"
    >
      {{ selected.label }}
      <span class="chevron-down"></span>
    </button>
    <ul v-if="isOpen" class="dropdown-menu">
      <li
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option)"
        :class="{ active: selected.value === option.value }"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: block;
  width: 100%;
  min-width: 100px;
}

.dropdown-toggle {
  width: 100%;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  background-color: var(--light-color);
  color: var(--primary-color);
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: var(--border-width-sm) solid var(--text-color-secondary);
  font-size: var(--font-size-md);
  text-transform: capitalize;
}

.dropdown-toggle .arrow {
  border: solid var(--primary-color);
  border-width: 0 var(--border-width-md) var(--border-width-md) 0;
  display: inline-block;
  padding: var(--spacing-xs);
  transform: rotate(45deg);
  margin-left: auto;
  -webkit-transform: rotate(45deg);
}

.dropdown-menu {
  position: absolute;
  padding: 0;
  list-style: none;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--light-color);
  border: var(--border-width-sm) solid #ddd;
  border-radius: var(--border-radius-md);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-menu li {
  padding: var(--spacing-md);
  cursor: pointer;
  text-transform: capitalize;
}

.dropdown-menu li.active {
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
}

.dropdown-menu li:hover {
  background-color: var(--hover-color);
}
</style>
