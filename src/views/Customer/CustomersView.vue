<script setup lang="ts">
import { type RouteRecordRaw, useRoute } from 'vue-router'
import { computed } from 'vue'
import BaseView from '@/views/BaseView.vue'
import CustomersHeader from '@/components/headers/CustomersHeader.vue'
import NewCustomerForm from '@/components/forms/NewCustomerForm.vue'
import Modal from '@/components/elements/Modal.vue'
import { useAccountsStore } from '@/stores/accounts'
import { useFormsStore } from '@/stores/forms'

import { storeToRefs } from 'pinia'

const formsStore = useFormsStore()
const { toggleNewCustomerForm } = formsStore
const { newCustomerFormOpen } = storeToRefs(formsStore)
const { activeAccount } = storeToRefs(useAccountsStore())

type ExtendedRouteRecordRaw = RouteRecordRaw & { props?: { hideFromNav?: boolean } }

const route = useRoute()

const links = computed(() => {
  const currentRoute = route.matched.find((x) => x.name === 'Customers')
  return currentRoute?.children.filter((x: ExtendedRouteRecordRaw) => !x.props?.hideFromNav) ?? []
})
</script>

<template>
  <BaseView heading="Customers" viewClass="customers-view" :links="links">
    <Modal v-if="newCustomerFormOpen">
      <NewCustomerForm @close="toggleNewCustomerForm(false)" />
    </Modal>
    <CustomersHeader heading="Customers" :activeAccount="activeAccount" />
    <RouterView />
  </BaseView>
</template>

<style>
.customers-view {
  flex: 1;
}
</style>
