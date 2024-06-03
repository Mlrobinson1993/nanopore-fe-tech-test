import type { Customer } from '@/types/customer'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useCustomersStore } from './customers'
import { useAccountsStore } from './accounts'
import type { AccountRole } from '@/types/account'

export const useUserStore = defineStore('user', () => {
  const { getCustomerById } = useCustomersStore()
  const { fetchAccounts } = useAccountsStore()

  const activeUser = ref<Customer | null>(null)

  const userFullName = computed<string>(() =>
    activeUser.value ? `${activeUser.value.first_name} ${activeUser.value.last_name}` : 'User'
  )

  // simulating login and fetching user data
  const fetchUser = async (id: number): Promise<void> => {
    activeUser.value = await getCustomerById(id)
    if (activeUser.value) {
      await fetchAccounts(activeUser.value.id)
    }
  }

  const getUserRole = (id: number): AccountRole | null =>
    activeUser.value?.account_roles?.find((role) => role.id === id) ?? null

  const setUserRole = (id: number, role: string): AccountRole | null => {
    const accountRole = activeUser.value?.account_roles?.find((r) => r.id === id)
    if (!accountRole || !activeUser.value) return null

    accountRole.role = role
    activeUser.value.account_roles =
      activeUser.value?.account_roles?.map((r) => (r.id === id ? accountRole : r)) ?? []

    return accountRole
  }

  return { activeUser, userFullName, getUserRole, setUserRole, fetchUser }
})
