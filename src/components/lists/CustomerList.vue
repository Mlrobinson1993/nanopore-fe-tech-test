<script setup lang="ts">
import CustomerCard from '@/components/elements/CustomerCard.vue'
import Icon from '@/components/elements/Icon.vue'
import { computed, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAccountsStore } from '@/stores/accounts'
import { useCustomersStore } from '@/stores/customers'
import { useFormsStore } from '@/stores/forms'
import { storeToRefs } from 'pinia'

const customersStore = useCustomersStore()
const { customers } = storeToRefs(customersStore)
const { getCustomers } = customersStore
const { activeAccount } = storeToRefs(useAccountsStore())
const { toggleNewCustomerForm } = useFormsStore()
const { getUserRole } = useUserStore()

const isLeader = computed<boolean>(
  () => getUserRole(activeAccount?.value?.id ?? -9999)?.role === 'leader'
)

await getCustomers(activeAccount?.value?.id ?? -9999)

watchEffect(async () => {
  if (activeAccount.value?.id === undefined) return
  await getCustomers(activeAccount.value.id)
})
</script>

<template>
  <div>
    <button
      class="add-customer-btn"
      :disabled="!isLeader"
      @click="() => toggleNewCustomerForm(true)"
      type="button"
    >
      <span class="icon">
        <Icon icon="plus" />
      </span>
      Add New Customer
    </button>

    <div class="customer-list">
      <CustomerCard
        v-for="customer in customers"
        :key="customer.id"
        :customer="customer"
        :activeAccount="activeAccount ?? undefined"
      />
    </div>
  </div>
</template>

<style scoped>
.customer-list {
  padding: var(--spacing-md) var(--spacing-xl);
}

.add-customer-btn {
  padding: 0;
  margin: 0 0 0 var(--spacing-xl);
  background-color: transparent;
  color: var(--text-color-primary);
  border: none;
  cursor: pointer;
  font-size: var(--font-size-md);
}

.add-customer-btn:not(:disabled):hover {
  text-decoration: underline;
}

.add-member-btn .icon {
  margin-right: var(--spacing-sm);
}

.add-member-btn:hover {
  text-decoration: underline;
}

@media (max-width: 800px) {
  .customer-card {
    flex-direction: column;
  }
  .permissions {
    flex-direction: column;
  }
}

@media (max-width: 960px) {
  .customer-list {
    padding: var(--spacing-md);
  }
  .add-customer-btn {
    margin-left: var(--spacing-md);
  }
}

@media (max-width: 1050px) {
  .customer-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    border-top: 2px solid var(--divider-color);
  }
  .add-customer-btn {
    padding: var(--spacing-md) 0;
  }
}

@media (max-width: 550px) {
  .customer-list {
    grid-template-columns: 1fr;
  }
}
</style>
