<script setup lang="ts">
import { type RouteRecordRaw } from 'vue-router'
import Icon from '@/components/elements/Icon.vue'
type Props = {
  heading: string
  subheading: string
  links: RouteRecordRaw[]
}
defineProps<Props>()
</script>

<template>
  <header>
    <h1>{{ heading }}</h1>
    <h3>{{ subheading }}</h3>

    <ul :class="{ 'no-content': !links?.length }">
      <li v-for="link in links" :key="link.name">
        <RouterLink exactActiveClass="link-active" :to="link.path" :title="link.name">
          <span class="text">
            {{ link.name }}
          </span>
          <span v-if="link.meta?.icon" class="icon">
            <Icon :icon="link.meta.icon as string" />
          </span>
        </RouterLink>
      </li>
    </ul>
  </header>
</template>

<style scoped>
header {
  height: 145px;
  padding: var(--spacing-md);
  color: var(--text-color-secondary);
}

h1,
h3 {
  padding: 0;
  font-weight: var(--font-weight-bold);
}

h1 {
  margin: 0;
  color: var(--text-color-secondary);
}

h3 {
  margin: var(--spacing-sm) 0 var(--spacing-lg) 0;
  color: var(--secondary-color);
}

.link-active {
  border-bottom: var(--border-width-xl) solid var(--text-color-secondary);
  font-weight: var(--font-weight-bold);
}

a > .icon {
  display: none;
}

ul {
  background: var(--text-color-primary);
  display: flex;
  gap: clamp(var(--spacing-xs), var(--spacing-md), var(--spacing-lg));
  list-style: none;
  margin: var(--spacing-md) 0 0;
  padding: 0;
}

li a {
  color: var(--secondary-color);
  text-decoration: none;
  padding: var(--spacing-sm);
  font-size: var(--font-size-base);
  text-align: center;
  white-space: nowrap;
}

li a.icon {
  display: none;
}

@media (max-width: 800px) {
  header {
    background-color: var(--text-color-primary);
    height: auto;
  }

  ul {
    justify-content: space-around;
  }
}

@media (max-width: 480px) {
  h3 {
    margin-bottom: var(--spacing-md);
  }

  ul.no-content {
    display: none;
  }
  ul {
    position: fixed;
    z-index: 1000;
    bottom: 0;
    left: 0;
    width: 100vw;
    padding: var(--spacing-lg);
  }

  li a {
    font-size: var(--font-size-lg);
    white-space: wrap;
    padding: 0;
  }
  li a.link-active {
    border-bottom: none;
    color: var(--text-color-secondary);
  }

  a > .text {
    display: none;
  }

  a > .icon {
    display: block;
  }
}
</style>
