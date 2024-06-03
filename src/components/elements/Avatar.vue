<script setup lang="ts">
const { size } = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  }
})

const src = () => {
  let baseUrl = 'https://picsum.photos/'

  if (size === 'lg') {
    return `${baseUrl}100/100`
  } else {
    return `${baseUrl}60/60`
  }
}
</script>

<template>
  <img :src="src()" alt="avatar" :class="`avatar avatar-${size ?? 'md'}`" />
</template>

<style scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-circle);
  overflow: hidden;
}
.avatar-sm {
  width: var(--avatar-size-sm);
  height: var(--avatar-size-sm);
}
.avatar-md {
  width: var(--avatar-size-md);
  height: var(--avatar-size-md);
}
.avatar-lg {
  width: var(--avatar-size-lg);
  height: var(--avatar-size-lg);
}
</style>
