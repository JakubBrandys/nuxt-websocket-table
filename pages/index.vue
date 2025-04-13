<template>
  <section>
    <h2 class="text-xl font-semibold mb-4">Orders List</h2>
    <div class="mb-4">
      <BaseInput v-model="searchQuery" />
    </div>
    <OrderTable :orders="data?.data ?? []" :loading="status === 'pending'" />
    <div class="mt-6 flex justify-center">
      <Pagination
        v-model="page"
        :total-pages="data?.meta.last_page ?? 0"
        :max-visible="5"
        :per-page-options="[10, 20, 30]"
        @update:per-page="handlePerPageChange"
      />
    </div>
    <div class="mt-6 flex justify-center">
      <Button @click="simulateUpdate"> Simulate Update </Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FetchError } from 'ofetch'
import { useFetch } from '#app'
import { debounce } from '@/utils/debounce'
import OrderTable from '@/components/OrderTable.vue'
import { useOrdersChannel } from '@/composables/useOrdersChannel'

const searchQuery = ref('')
const page = ref(1)
const ordersPerPage = ref(10)
const debouncedSearchQuery = ref('')

const { data, refresh, status } = useFetch('/api/orders', {
  query: {
    page,
    per_page: ordersPerPage,
    search: debouncedSearchQuery,
  },
})

const handlePerPageChange = (value: number) => {
  ordersPerPage.value = value
  page.value = 1
}

const debouncedSearch = debounce(() => {
  debouncedSearchQuery.value = searchQuery.value
}, 700)

watch(searchQuery, () => {
  debouncedSearch()
})

useOrdersChannel(() => {
  refresh()
})

const simulateUpdate = async () => {
  try {
    await $fetch('/api/simulate-update', { method: 'POST' })
  } catch (err) {
    const error = err as FetchError<{ message?: string }>

    const message = error.data?.message

    alert(`Error: ${message}`)
  }
}
</script>
