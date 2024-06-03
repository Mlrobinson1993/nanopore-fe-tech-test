<script setup lang="ts">
import { computed } from 'vue'
import PageHeader from '@/components/headers/PageHeader.vue'
import { useAccountsStore } from '@/stores/accounts'
import { storeToRefs } from 'pinia'

const { subheading } = defineProps({
  heading: {
    type: String,
    required: true
  },
  viewClass: {
    type: String,
    default: 'default-view-class'
  },
  links: {
    type: Array,
    default: () => []
  },
  subheading: {
    required: false,
    type: String
  }
})

const { activeAccount } = storeToRefs(useAccountsStore())

const sub = computed(() =>
  subheading ? subheading : activeAccount.value?.organisation_name ?? 'No organisation selected'
)
</script>

<template>
  <div :class="viewClass">
    <PageHeader :heading="heading" :subheading="sub" :links="links" />
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.default-view-class {
  flex: 1;
}

.container {
  padding: 0 var(--spacing-md);
}

@media (max-width: 1050px) {
  .container {
    padding: 0;
  }
}
</style>
