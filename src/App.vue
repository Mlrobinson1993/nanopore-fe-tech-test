<script setup lang="ts">
import Navbar from '@/components/nav/Navbar.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import SpinnerSrc from '@/assets/spinner.svg'
import { useUserStore } from './stores/user'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { activeUser } = storeToRefs(userStore)

const userExists = computed(
  () => activeUser.value?.id !== null && activeUser.value?.id !== undefined
)

userStore.fetchUser(1)

document.title = 'Nanopore Dashboard'
</script>

<template>
  <div id="app-main">
    <Navbar />
    <main v-if="userExists" class="main-container">
      <Sidebar />
      <RouterView />
    </main>
    <main v-else class="main-container main-container-loading">
      <img :src="SpinnerSrc" alt="loading spinner" />
    </main>
  </div>
</template>

<style>
#app-main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-container {
  display: flex;
  flex: 1;
  position: relative;
  background: var(--background-gradient);
}

.main-container-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

@media (max-width: 800px) {
  .main-container {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .main-container {
    padding-bottom: calc(var(--spacing-xl) * 3); /* allow space for mobile nav */
  }
}
</style>
