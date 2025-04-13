<template>
  <div class="w-full flex md:flex-row items-center justify-between gap-4">
    <div class="text-sm flex items-center gap-2">
      <span>Per page:</span>
      <select class="border px-2 py-1 rounded" @change="handlePerPageChange">
        <option v-for="option in perPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <nav class="flex gap-2 flex-wrap justify-center flex-1">
      <Button
        :disabled="modelValue === 1"
        :class="modelValue > 1 ? 'cursor-pointer' : ''"
        @click="updatePage(modelValue - 1)"
      >
        Prev
      </Button>

      <Button
        v-for="pageNumber in visiblePages"
        :key="pageNumber"
        :class="pageNumber === modelValue ? 'bg-gray-200 font-bold' : 'cursor-pointer'"
        @click="updatePage(pageNumber)"
      >
        {{ pageNumber }}
      </Button>

      <Button
        :disabled="modelValue === totalPages"
        :class="modelValue < totalPages ? 'cursor-pointer' : ''"
        @click="updatePage(modelValue + 1)"
      >
        Next
      </Button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/Button.vue'

const modelValue = defineModel<number>({ default: 1 })

const props = defineProps<{
  totalPages: number
  perPageOptions: number[]
  maxVisible?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue' | 'update:perPage', value: number): void
}>()

const updatePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:modelValue', page)
  }
}

const handlePerPageChange = (e: Event) => {
  const value = Number((e.target as HTMLSelectElement).value)
  emit('update:perPage', value)
}

const visiblePages = computed(() => {
  const maxVisible = props.maxVisible ?? 5
  const half = Math.floor(maxVisible / 2)

  let start = Math.max(modelValue.value - half, 1)
  let end = start + maxVisible - 1

  if (end > props.totalPages) {
    end = props.totalPages
    start = Math.max(end - maxVisible + 1, 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
</script>
