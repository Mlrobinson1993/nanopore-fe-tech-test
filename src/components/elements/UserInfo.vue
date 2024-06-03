<script setup lang="ts">
import { computed } from 'vue'

import Avatar from '@/components/elements/Avatar.vue'
import { useUserStore } from '@/stores/user'
import { useAccountsStore } from '@/stores/accounts'
import { storeToRefs } from 'pinia'

const accountsStore = useAccountsStore()
const { activeAccount } = storeToRefs(accountsStore)
const { activeUser, userFullName } = storeToRefs(useUserStore())

const heading = computed<string>(() =>
  activeUser.value ? `Welcome, ${userFullName.value}` : 'Welcome'
)

const role = computed<string>(() => {
  const userRole = activeUser.value?.account_roles?.find(
    (role) => role.id === activeAccount.value?.id
  )
  if (!userRole) return 'No role assigned'
  return userRole.role
})
</script>
<template>
  <div class="user-info">
    <div class="avatar-container">
      <Avatar />
    </div>

    <div class="text-container">
      <h3>{{ heading }}</h3>
      <h5>{{ role }}</h5>
    </div>
  </div>
</template>

<style scoped>
.user-info-container {
  background: var(--light-color);
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-sm) var(--spacing-lg);
  border-bottom: var(--border-width-sm) solid var(--border-color);
}
.user-info {
  display: flex;
}

.avatar-container {
  margin-right: var(--spacing-md);
}

.text-container h3 {
  font-size: clamp(var(--font-size-sm), var(--font-size-md), var(--font-size-lg));
}

.text-container h5 {
  font-weight: var(--font-weight-regular);
  font-size: clamp(var(--font-size-sm), var(--font-size-base), var(--font-size-md));
}

.text-container h3,
.text-container h5 {
  margin: var(--spacing-xs) 0;
  color: var(--primary-color);
  text-transform: capitalize;
}
</style>
