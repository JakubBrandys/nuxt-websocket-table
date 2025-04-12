<template>
  <input
    :value="modelValue"
    type="text"
    placeholder="Find order..."
    class="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
const modelValue = defineModel<string>()

const emit = defineEmits<{
  (e: 'update:modelValue' | 'input', value: string): void
}>()

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
}
</script>
