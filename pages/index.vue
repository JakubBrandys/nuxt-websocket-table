<template>
  <section>
    <h2 class="text-xl font-semibold mb-4">Orders List</h2>
    <div class="mb-4">
      <BaseInput v-model="searchQuery" @input="handleSearch" />
    </div>
    <OrderTable :orders="data.data" :loading="status === 'pending'" />
    <div class="mt-6 flex justify-center">
      <Button @click="simulateUpdate"> Simulate Update </Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '#app'
import { debounce } from '@/utils/debounce'
import OrderTable from '@/components/OrderTable.vue'
import type { FetchError } from 'ofetch'

const searchQuery = ref('')
const page = ref(1)
const ordersPerPage = ref(10)

const { data, refresh, status } = useFetch('/api/orders', {
  query: {
    page,
    per_page: ordersPerPage,
    search: searchQuery,
  },
})

const handleSearch = debounce(() => {
  refresh()
}, 500)

const simulateUpdate = async () => {
  try {
    await $fetch('/api/simulate-update', { method: 'POST' })
    alert('Order simulation completed successfully.')
  } catch (err) {
    const error = err as FetchError<{ message?: string }>

    const message = error.data?.message || 'An unexpected error occurred during order simulation.'

    alert(`Error: ${message}`)
  }
}
</script>
