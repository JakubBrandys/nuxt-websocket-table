<template>
  <button
    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="customClass"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
  class?: string
}>()

const customClass = computed(() => props.class)
</script>
