<script setup lang="ts">
import { computed, toRefs } from 'vue'
import Avatar from '@/components/elements/Avatar.vue'
import Icon from '@/components/elements/Icon.vue'
import type { Account } from '@/types/account'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useCustomersStore } from '@/stores/customers'
import { useFormsStore } from '@/stores/forms'

const { customers } = storeToRefs(useCustomersStore())
const { userFullName, getUserRole } = useUserStore()
const { toggleNewCustomerForm } = useFormsStore()

type Props = {
  activeAccount: Account | null
}

const props = defineProps<Props>()
const { activeAccount } = toRefs(props)

const teamNum = computed<string>(() => activeAccount?.value?.duns_number ?? 'No team number')
const accountsLength = computed<number>(() => customers.value?.length ?? -9999)
const isLeader = computed<boolean>(
  () => getUserRole(activeAccount?.value?.id ?? -9999)?.role === 'leader'
)
</script>

<template>
  <div class="customers-header">
    <div class="customers-header-info">
      <div class="info-text">
        <h2>
          {{ activeAccount?.organisation_name ?? 'No account selected' }}
        </h2>
        <span
          class="info-icon"
          :title="`The active account is: ${activeAccount?.organisation_name}`"
        >
          i
        </span>
      </div>
      <div class="team-info">
        <div class="customer-details">
          <p>{{ teamNum }}</p>
          <p>{{ userFullName }}</p>
        </div>
        <div class="avatars">
          <Avatar v-for="i in accountsLength" :key="i" size="md" />
          <button
            v-if="isLeader"
            class="add-avatar"
            type="button"
            @click="toggleNewCustomerForm(true)"
          >
            <Icon icon="plus" />
          </button>
        </div>

        <button
          v-if="isLeader"
          class="create-account-btn"
          @click="() => toggleNewCustomerForm(true)"
        >
          Invite Customer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.customers-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-lg) var(--spacing-xl);
  background-color: var(--light-color);
}

.customers-header-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  width: 100%;
}

.team-info {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.info-text h2 {
  color: var(--text-color-primary);
  margin: 0;
  font-weight: var(--font-weight-regular);
  margin-right: var(--spacing-sm);
}

.info-text {
  display: flex;
  align-items: center;
}

.info-icon {
  cursor: pointer;
  display: inline-block;
  border-radius: var(--border-radius-circle);
  background-color: var(--primary-color);
  color: var(--light-color);
  font-size: var(--font-size-sm);
  width: var(--size-sm);
  height: var(--size-sm);
  display: flex;
  justify-content: center;
  align-items: center;
}

.customer-details {
  margin-right: var(--spacing-md);
  color: var(--text-color-tertiary);
}

.customer-details p {
  margin: 0;
}

.avatars {
  display: flex;
  align-items: center;
}

.add-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--avatar-size-md);
  height: var(--avatar-size-md);
  margin-left: calc(var(--spacing-sm) * -1);
  border: var(--border-width-sm) solid var(--text-color-tertiary);
  background: transparent;
  color: var(--text-color-tertiary);
  border-radius: var(--border-radius-circle);
  cursor: pointer;
  position: relative;
  z-index: 0;
}

.add-avatar:hover {
  border-width: var(--border-width-md);
}

.avatar:not(:first-of-type) {
  margin-left: calc(var(--spacing-sm) * -1);
}

.avatar {
  box-shadow: 0 0 0 2px var(--text-color-tertiary);
}

.avatar {
  position: relative;
  z-index: 1;
}

.create-account-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: var(--border-width-sm) solid var(--primary-color);
  border-radius: var(--border-radius-lg);
  background-color: var(--light-color);
  color: var(--primary-color);
  cursor: pointer;
  margin-left: auto;
}

.create-account-btn:hover {
  background-color: var(--primary-color);
  color: var(--light-color);
}

@media (max-width: 960px) {
  .customers-header {
    padding: var(--spacing-xl) var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .team-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .create-account-btn {
    margin: 0 auto 0 0;
    width: 100%;
    padding: var(--spacing-md);
  }
}
</style>
