<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import type { Customer } from '@/types/customer'
import type { Option } from '@/types/option'

import Dropdown from '@/components/elements/Dropdown.vue'

import { useCustomersStore } from '@/stores/customers'
import { useUserStore } from '@/stores/user'
import { useAccountsStore } from '@/stores/accounts'
import type { AccountRole } from '@/types/account'

const { activeAccount } = storeToRefs(useAccountsStore())
const { activeUser } = storeToRefs(useUserStore())
const { createCustomer } = useCustomersStore()

const emit = defineEmits(['close'])

const newCustomer = ref<Partial<Customer>>({
  first_name: '',
  last_name: '',
  job_title: '',
  email: '',
  account_roles: []
})

const roles: Option[] = [
  { id: 1, label: 'Member', value: 'member' },
  { id: 2, label: 'Admin', value: 'admin' },
  { id: 3, label: 'Leader', value: 'leader' }
]

const selectedRole = ref<Option>(roles[0])

const closeModal = (): void => {
  emit('close')
}

const activeAccountRole = computed<AccountRole | undefined>(() =>
  activeUser.value?.account_roles.find((role) => role.id === activeAccount.value?.id)
)

const submitForm = () => {
  try {
    if (activeAccountRole.value?.role !== 'leader') {
      throw new Error('You do not have permission to create a new customer')
    }

    if (!activeAccount.value) {
      throw new Error('An unknown error occurred. Please try again later.')
    }

    newCustomer.value.account_roles!.push({
      id: activeAccount.value.id,
      role: selectedRole.value.value
    })

    createCustomer(newCustomer.value)
    closeModal()
  } catch (e: any) {
    alert(e.message)
  }
}
</script>

<template>
  <div class="form-content">
    <h2>New Customer</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group-double">
        <div class="form-group">
          <label for="first_name">First Name</label>
          <input id="first_name" v-model="newCustomer.first_name" type="text" required />
        </div>
        <div class="form-group">
          <label for="last_name">Last Name</label>
          <input id="last_name" v-model="newCustomer.last_name" type="text" required />
        </div>
      </div>
      <div class="form-group">
        <label for="job_title">Job Title</label>
        <input id="job_title" v-model="newCustomer.job_title" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="newCustomer.email" type="email" required />
      </div>

      <div class="form-group">
        <label for="account_roles">Account Roles</label>
        <Dropdown
          :options="roles"
          :defaultVal="selectedRole"
          @select="(val) => (selectedRole = val)"
        />
      </div>

      <div class="form-actions">
        <button type="button" @click="closeModal">Cancel</button>
        <button type="submit">Create</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-content {
  background: var(--light-color);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  min-inline-size: 500px;
  max-width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-content h2 {
  margin-bottom: var(--spacing-lg);
}

.form-group {
  width: 100%;
  margin-bottom: var(--spacing-md);
}

.form-group-double {
  display: flex;
  width: 100%;
  gap: var(--spacing-md);
  justify-content: space-between;
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-md);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: var(--spacing-sm);
  box-sizing: border-box;
  border: var(--border-width-sm) solid var(--text-color-secondary);
  border-radius: var(--spacing-xs);
}

.form-actions {
  margin-top: var(--spacing-xl);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
}

.form-actions button {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
}

.form-actions button[type='submit'] {
  background-color: transparent;
  border: var(--border-width-sm) solid var(--primary-color);
  color: var(--primary-color);
}

.form-actions button[type='submit']:hover {
  background-color: var(--primary-color);
  color: var(--light-color);
}

.form-actions button[type='button'] {
  background-color: #ccc;
}

.form-actions button[type='button']:hover {
  background-color: #999;
}

@media (max-width: 800px) {
  .form-content {
    padding: var(--spacing-md);
    min-inline-size: 400px;
  }

  .form-group-double {
    flex-direction: column;
    gap: 0;
  }
}

@media (max-width: 480px) {
  .form-content {
    min-inline-size: unset;
    width: 90vw;
  }
}
</style>
