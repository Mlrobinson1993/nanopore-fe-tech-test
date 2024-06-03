import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormsStore = defineStore('forms', () => {
  const newCustomerFormOpen = ref<boolean>(false)

  const toggleNewCustomerForm = (isOpen: boolean): void => {
    newCustomerFormOpen.value = isOpen
  }

  return { newCustomerFormOpen, toggleNewCustomerForm }
})
