import { ref } from 'vue'
import { defineStore } from 'pinia'
import useApi from '@/composables/useApi'
import { type Account } from '@/types/account'

export const useAccountsStore = defineStore('accounts', () => {
  const api = useApi()

  const accounts = ref<Account[]>([])
  const activeAccount = ref<Account | null>(null)

  const fetchAccounts = async (userId: number) => {
    if (!userId) return
    const accs = await api.get<Account[]>(`accounts/${userId}`)
    if (accs?.length) {
      accounts.value = accs
      setActiveAccount(accs[0])
    }
  }

  const setActiveAccountById = (id: number) => {
    const account = accounts.value.find((acc) => acc.id === id) || null
    if (account) activeAccount.value = account
  }

  const setActiveAccount = (account: Account) => {
    activeAccount.value = account
  }

  return { fetchAccounts, accounts, activeAccount, setActiveAccountById }
})
