<script setup lang="ts">
import { ref, computed, type ComputedRef } from 'vue'
import { storeToRefs } from 'pinia'
import UserInfo from '@/components/elements/UserInfo.vue'
import Dropdown from '@/components/elements/Dropdown.vue'
import BurgerIcon from '@/components/elements/BurgerIcon.vue'
import Icon from '@/components/elements/Icon.vue'
import type { Option } from '@/types/option'
import { useAccountsStore } from '@/stores/accounts'

const accountsStore = useAccountsStore()
const { setActiveAccountById } = accountsStore
const { accounts, activeAccount } = storeToRefs(accountsStore)

const dropdownAccounts: ComputedRef<Option[]> = computed(() =>
  accounts.value.map((account) => ({
    id: account.id,
    label: account.organisation_name,
    value: `${account.id}-${account.organisation_name}`
  }))
)

const defaultAccount = computed(() => ({
  id: activeAccount.value?.id ?? -9999,
  label: activeAccount.value?.organisation_name ?? 'Please select an account',
  value: activeAccount?.value
    ? `${activeAccount.value.id}-${activeAccount.value.organisation_name}`
    : ''
}))

const handleSelect = (option: Option) => {
  setActiveAccountById(option.id)
}

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const routes = [
  { name: 'Dashboard', path: '/', icon: 'dashboard', divider: false },
  { name: 'Orders', path: '/orders', icon: 'clipboard', divider: false },
  { name: 'Products', path: '/products', icon: 'box', divider: true },
  { name: 'Customers', path: '/customers/general', icon: 'user', divider: false },
  { name: 'Notifications', path: '/notifications', icon: 'bell', divider: false }
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <UserInfo />
      <div class="burger">
        <BurgerIcon @toggle="toggleMenu" size="md" />
      </div>
    </div>
    <div :class="['sidebar-content', { open: isMenuOpen }]">
      <Dropdown
        :options="dropdownAccounts"
        :defaultVal="defaultAccount"
        :disabled="!accounts.length"
        @select="handleSelect"
      />
      <ul>
        <li v-for="route in routes" :key="route.name">
          <RouterLink :to="route.path" exactActiveClass="link-active">
            <Icon :icon="route.icon" />
            <span>{{ route.name }}</span>
          </RouterLink>
          <div v-if="route.divider" class="divider"></div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: clamp(200px, 30vw, 400px);
  padding: var(--spacing-md);
  background-color: var(--light-color);
  margin: var(--spacing-md) var(--spacing-md) 0;
  border-radius: var(--border-radius-lg);
  position: relative;
}

.burger {
  display: none;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-content {
  display: block;
  padding: var(--spacing-md) 0 var(--spacing-lg) 0;
}

.sidebar ul {
  margin: var(--spacing-lg) 0;
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: var(--spacing-sm) 0;
}

.sidebar a {
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
}

.sidebar .link-active {
  background: var(--hover-color);
  font-weight: var(--font-weight-bold);
}

.sidebar a:hover {
  text-decoration: underline;
}

.divider {
  height: 2px;
  background-color: var(--divider-color);
  margin: var(--spacing-md) 0;
}

@media (max-width: 800px) {
  .sidebar {
    width: 100vw;
    margin: 0;
    border-radius: 0;
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .burger {
    display: block;
  }

  .sidebar-content {
    display: none;
  }

  .sidebar-content.open {
    margin-top: var(--spacing-md);
    display: block;
    padding-bottom: 0;
  }
}
</style>
