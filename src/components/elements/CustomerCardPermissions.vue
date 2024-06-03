<script setup lang="ts">
import Toggle from '@/components/elements/Toggle.vue'
import { computed, toRefs } from 'vue'

type Props = {
  role: string
}

type ToggleGroup = {
  label: string
  permissions: {
    label: string
    value: string
    modelValue: boolean
  }[]
}

const props = defineProps<Props>()
const { role } = toRefs(props)

const customerIsLeader = computed<boolean>(() => role.value === 'leader')

// simulating the data from the API
const toggleGroups: ToggleGroup[] = [
  {
    label: 'Accounts',
    permissions: [
      { label: 'Add new members', value: 'addMembers', modelValue: customerIsLeader.value },
      { label: 'Remove members', value: 'removeMembers', modelValue: customerIsLeader.value },
      { label: 'Create an account', value: 'createAccount', modelValue: customerIsLeader.value }
    ]
  },
  {
    label: 'Community',
    permissions: [
      { label: 'Full access', value: 'fullAccess', modelValue: customerIsLeader.value },
      { label: 'Public access', value: 'publicAccess', modelValue: false },
      { label: 'Registered guest', value: 'registeredGuest', modelValue: false }
    ]
  }
]
</script>

<template>
  <div class="permissions">
    <div v-for="group in toggleGroups" :key="group.label" class="permission-group">
      <label>{{ group.label }}</label>
      <div v-for="permission in group.permissions" :key="permission.label">
        <Toggle :modelValue="permission.modelValue" />
        <span>{{ permission.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.permissions {
  display: flex;
  justify-content: flex-start;
  gap: var(--spacing-md);
}

.permission-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.permission-group > label {
  font-weight: bold;
  margin-bottom: var(--spacing-md);
}

.permission-group div {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  gap: var(--spacing-sm);
}

@media (max-width: 960px) {
  .permissions {
    flex-direction: column;
  }
}
</style>
