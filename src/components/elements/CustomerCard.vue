<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Avatar from '@/components/elements/Avatar.vue'
import Icon from '@/components/elements/Icon.vue'
import Dropdown from '@/components/elements/Dropdown.vue'
import CustomerCardPermissions from '@/components/elements/CustomerCardPermissions.vue'
import type { Customer } from '@/types/customer'
import type { Option } from '@/types/option'
import { useAccountsStore } from '@/stores/accounts'
import { useUserStore } from '@/stores/user'
import { useCustomersStore } from '@/stores/customers'
import { computed, ref } from 'vue'

const userStore = useUserStore()
const { getUserRole, setUserRole } = userStore
const { activeUser } = storeToRefs(userStore)
const { getCustomerRole, updateCustomerRole, deleteCustomer } = useCustomersStore()
const { activeAccount } = storeToRefs(useAccountsStore())
const { customer: c } = defineProps<{
  customer: Customer
}>()

const customer = ref<Customer>(c)
const userIsLeader = computed<boolean>(
  () => getUserRole(activeAccount.value?.id ?? -9999)?.role === 'leader'
)
const userIsMe = computed<boolean>(() => activeUser.value?.id === customer.value?.id)

const defaultRole = { id: -9999, label: 'Role Unavailable', value: 'default' }
const roles = [
  { id: 1, label: 'Admin', value: 'admin' },
  { id: 2, label: 'Leader', value: 'leader' },
  { id: 3, label: 'Member', value: 'member' }
]

const activeRoleAsOption = ref<Option>({ id: -9999, label: 'Role Unavailable', value: 'default' })
const availableRoles = ref<Option[]>([])

const handleRoleUpdate = async (role: Option) => {
  const c = await updateCustomerRole(
    customer.value.id,
    activeAccount.value?.id ?? -9999,
    role.value
  )

  if (c) {
    if (c.id === activeUser.value?.id) {
      // then I'm the logged in user
      setUserRole(activeAccount.value?.id ?? -9999, role.value)
    }
    customer.value = c
    activeRoleAsOption.value = getActiveRoleAsOption()
    availableRoles.value = getAvailableRoles()
  }
}

const getActiveRoleAsOption = () => {
  const customerAccountRole = getCustomerRole(customer.value.id, activeAccount.value?.id ?? -9999)
  if (!customerAccountRole) return defaultRole
  const { role: label, id } = customerAccountRole
  return {
    id,
    label,
    value: label.toLowerCase()
  }
}

const getAvailableRoles = () => {
  const userActiveRole = getUserRole(activeAccount?.value?.id ?? -9999)
  if (!userActiveRole) return []
  const customerActiveRole = activeRoleAsOption.value

  if (userActiveRole.role === 'member') {
    return []
  }

  if (userActiveRole.role === 'leader') {
    return roles.filter((x) => x.value !== customerActiveRole.value)
  }

  if (userActiveRole.role === 'admin') {
    return customerActiveRole.value === 'leader'
      ? []
      : roles.filter((role) => !['admin', 'leader'].includes(role.value))
  }

  return []
}

availableRoles.value = getAvailableRoles()
activeRoleAsOption.value = getActiveRoleAsOption()

const cannotEdit = computed(() => {
  const userRole = getUserRole(activeAccount?.value?.id ?? -9999)?.role
  const customerRole = getCustomerRole(customer.value.id, activeAccount?.value?.id ?? -9999)?.role

  return userRole === 'member' || (userRole !== 'leader' && customerRole === 'leader')
})

const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const parseDate = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString()
}
</script>

<template>
  <div class="customer-card-container">
    <div :class="['customer-card', { 'customer-card-expanded': isExpanded }]">
      <Avatar size="md" />

      <div class="customer-info">
        <h3>{{ customer.first_name }} {{ customer.last_name }}</h3>
        <p>{{ customer.email }}</p>
        <p>{{ parseDate(customer.start_date) }}</p>
      </div>
      <div class="options">
        <div class="options-dropdown">
          <Dropdown
            :options="availableRoles"
            :defaultVal="activeRoleAsOption"
            :disabled="cannotEdit"
            @select="handleRoleUpdate"
          />
        </div>
        <button @click="toggleExpand" class="expand-button action-button" :disabled="cannotEdit">
          <Icon v-if="!isExpanded" icon="plus" />
          <Icon v-else icon="minus" />
        </button>
        <button @click="toggleExpand" class="edit-button action-button" :disabled="cannotEdit">
          Edit
          <Icon v-if="!isExpanded" icon="plus" />
          <Icon v-else icon="minus" />
        </button>
      </div>
    </div>
    <div v-if="isExpanded" class="customer-card-body">
      <CustomerCardPermissions :role="activeRoleAsOption.value" />
      <div class="buttons">
        <button
          v-if="userIsLeader && !userIsMe"
          @click="deleteCustomer(customer.id)"
          class="delete-button"
        >
          <Icon icon="trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.customer-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  border-top: var(--border-width-md) solid var(--divider-color);
  background-color: var(--light-color);
  cursor: pointer;
}

.customer-card-expanded {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: var(--hover-color-light);
  position: relative;
}

.customer-card .avatar {
  box-shadow: 0 0 0 2px var(--text-color-tertiary);
}

.customer-card-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--spacing-md);
}

.customer-card-body {
  grid-column: span 3;
  border-top: var(--border-width-sm) solid var(--divider-color);
  background-color: var(--hover-color-lightest);
  padding: var(--spacing-lg);
  color: var(--tertiary-color);
}

.customer-card-body .buttons {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) 0 0 0;
}

.buttons .delete-button {
  background: transparent;
  font-size: var(--font-size-lg);
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.options-dropdown {
  width: 200px;
}

:deep(.dropdown-toggle) {
  color: var(--tertiary-color);
  border: var(--border-width-md) solid #b7bdbd;
}

.customer-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  color: var(--tertiary-color);
  white-space: nowrap;
}

.options {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.action-button {
  background-color: var(--primary-color);
  color: var(--light-color);
  padding: var(--spacing-sm);
  cursor: pointer;
}

.edit-button {
  display: none;
  width: 100%;
  border: var(--border-width-md) solid var(--primary-color);
  border-radius: var(--border-radius-md);
}

.expand-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: var(--border-radius-sm);
  height: var(--size-md);
  width: var(--size-md);
}

.action-button:hover {
  opacity: 0.8;
}

@media (max-width: 1250px) {
  .customer-info {
    width: 100%;
  }

  .options-dropdown {
    width: auto;
  }
}

@media (max-width: 1050px) {
  .customer-card-container {
    padding: 0;
  }

  .customer-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: var(--border-width-md) solid var(--primary-color);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-lg);
  }

  .customer-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    margin: var(--spacing-sm) 0;
  }

  .customer-info h3,
  .customer-info p {
    margin: 0;
  }

  .edit-button {
    display: flex;
    justify-content: space-between;
  }

  .options {
    width: 100%;
    gap: var(--spacing-sm);
    flex-direction: column;
  }

  .options-dropdown {
    width: 100%;
  }
  .expand-button {
    display: none;
  }
}
</style>
