<script setup lang="ts">
import Avatar from '@/components/elements/Avatar.vue'
import BurgerIcon from '@/components/elements/BurgerIcon.vue'
import { useRouter } from 'vue-router'
import logoSrc from '@/assets/logo.svg'
const router = useRouter()

const toggleMenu = (): void => {
  alert('Toggling menu')
}

const handleProfileClick = (): void => {
  alert('Profile clicked')
}

const navigate = (path: string): void => {
  router.push(path)
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <button class="navbar-menu">
        <BurgerIcon @toggle="toggleMenu" theme="light" size="md" />
      </button>
      <span class="divider" />

      <img :src="logoSrc" alt="Nanopore logo" class="logo-image" @click="navigate('/')" />
    </div>
    <button class="navbar-user" type="button" @click="handleProfileClick">
      <Avatar size="sm" />
      <span class="chevron-down"></span>
    </button>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background-color: var(--primary-color);
  color: var(--light-color);
}

button {
  background-color: transparent;
  border: none;
  outline: none;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: transparent;
  border: none;
  cursor: pointer;
}

.logo-image {
  cursor: pointer;
}

.chevron-down {
  border-color: var(--light-color);
  opacity: 0.5;
}

.user-image {
  width: calc(var(--size-md) * 2);
  height: calc(var(--size-md) * 2);
  border-radius: var(--border-radius-circle);
}

.navbar-brand {
  display: flex;
  align-items: center;
  width: clamp(100px, 20%, 200px);
  gap: var(--spacing-sm);
}

.divider {
  min-height: 35px;
  min-width: 1px;
  background-color: var(--divider-color);
  opacity: 0.5;
}
.navbar-menu {
  height: 100%;
}
</style>
