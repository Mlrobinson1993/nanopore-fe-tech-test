import { ref } from 'vue'
import { defineStore } from 'pinia'
import useApi from '@/composables/useApi'
import { type Customer } from '@/types/customer'

export const useCustomersStore = defineStore('customers', () => {
  const api = useApi()

  const customers = ref<Customer[]>([])

  const fetchCustomers = async (accountId?: number) => {
    const endpoint = accountId !== undefined ? `customers/${accountId}` : 'customers'
    const customers = await api.get<Customer[]>(endpoint)
    return customers ?? []
  }

  const fetchCustomer = async (customerId: number) => {
    const customer = await api.get<Customer>(`customer/${customerId}`)
    return customer ?? null
  }

  const getCustomers = async (accountId: number) => {
    customers.value = []
    const custs = await fetchCustomers(accountId)
    if (custs?.length) {
      customers.value = custs
    }
  }

  const getCustomerById = async (customerId: number) => {
    return fetchCustomer(customerId)
  }

  // simulating an endpoint to create a customer
  const createCustomer = async (customer: Partial<Customer>) => {
    const start_date = new Date().toISOString()

    const data = {
      ...customer,
      start_date
    } as Customer

    const newCustomer = await api.post('customer', data)
    customers.value = [...customers.value, newCustomer]
  }

  //simulating an endpoint to delete a customer by id
  const deleteCustomer = async (customerId: number) => {
    const deleted = await api.remove(`customer/${customerId}`)
    if (deleted) {
      customers.value = customers.value.filter((c) => c.id !== customerId)
    } else {
      throw new Error('Failed to delete customer')
    }
  }

  // simulating an endpoint which updates a customer role
  const updateCustomerRole = async (
    customerId: number,
    accountId: number,
    role: string
  ): Promise<Customer | null> => {
    const customer = customers.value.find((c) => c.id === customerId)
    if (!customer) return null

    const customerRole = customer.account_roles.find((r) => r.id === accountId)
    if (!customerRole) return null

    customerRole.role = role
    customer.account_roles = customer.account_roles.map((r) =>
      r.id === accountId ? customerRole : r
    )

    const updatedCustomer = await api.put<Customer>(`customer/${customerId}`, customer)

    customers.value = customers.value.map((c) => (c.id === customerId ? updatedCustomer : c))
    return customer
  }

  // simulating an endpoint which checks a customers role for an account
  const getCustomerRole = (customerId: number, accountId: number) => {
    const customer = customers.value.find((c) => c.id === customerId)

    if (!customer?.account_roles) return null

    return customer?.account_roles?.find((role) => role.id === accountId) ?? null
  }

  return {
    getCustomers,
    getCustomerById,
    customers,
    getCustomerRole,
    updateCustomerRole,
    deleteCustomer,
    createCustomer
  }
})
